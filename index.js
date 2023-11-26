//TO ACTIVATE DEBUG WRIGHT "export DEBUG=debug"
const debug = require('debug')('debug')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//To parse json:
app.use(express.json())

//static homepage
app.use('/', express.static('static'))

mongoose.connect('mongodb://localhost:27017/flyboy')
    .then(() => debug("Connected to mongoDB..."))
    .catch(err => debug('Unable to connect to db...' + err.message))

const logbookSchema = new mongoose.Schema({
    date: Date,
    reg: String,
    flightNumber: String,
    depature: String,
    offBlock: Date,
    destination: String,
    blocksOn: Date,
    blocktime: Date,
    blocktimeMinutes: Number,
    cmd: String,
    flightcrew: [{ type: String }],
})

const LogbookEntry = mongoose.model('logbook', logbookSchema)

async function makeLogbookEntry(date, reg, flightNumber, depature, offBlock, destination, blocksOn, cmd, flightcrew) {
    const offBlockPlaceholder = new Date(...offBlock)
    console.log(offBlockPlaceholder)
    const onBlockPlaceholder = new Date(...blocksOn)
    console.log(onBlockPlaceholder)
    const blocktimePlaceholder = new Date(onBlockPlaceholder - offBlockPlaceholder)
    console.log(blocktimePlaceholder)
    const blocktimeMinutesPlaceholder = (blocktimePlaceholder.getUTCMinutes() + (blocktimePlaceholder.getUTCHours() * 60))
    console.log(blocktimeMinutesPlaceholder)
    // debug("blocktimes in minutes :", blocktimeMinutesPlaceholder, " DATE:", blocktimePlaceholder)

    const entry = new LogbookEntry({
        // Input in UTC
        // date: new Date(Date.UTC(...date)),
        // Input in Local
        date: new Date(Date.UTC(...date)),
        reg: reg,
        flightNumber: flightNumber,
        depature: depature,
        offBlock: offBlockPlaceholder,
        destination: destination,
        blocksOn: onBlockPlaceholder,
        blocktime: blocktimePlaceholder,
        blocktimeMinutes: blocktimeMinutesPlaceholder,
        cmd: cmd,
        flightcrew: [...flightcrew],
    })
    const result = await entry.save()
    // debug(result)
}

// makeLogbookEntry([2022, 10, 10, 0, 0, 0], "SE-DEV", "NAX13", "UME", [2022, 10, 10, 12, 10, 30], "LLA", [2022, 10, 10, 15, 10, 30], "jojje", ["bigboy", "smallboy"])

const fs = require('fs');
const csv = require('csv-parser');

const results = [];

function convertName(input) {
    // Split the input into parts
    const parts = input.split(" ");
    if (parts.length == 1)
        return toString(parts)
    // Take the first letter of the first name and concatenate it with the last name in uppercase
    const output = parts[0].charAt(0).toUpperCase() + ". " + parts[1].toUpperCase();

    return output;
}


fs.createReadStream('./docker/org_logbook.csv')
    .pipe(csv())
    .on('headers', (headers) => {
        debug(headers)
        // Rename the first column to "date"
        headers[0] = 'date';
        headers[1] = 'reg';
        headers[2] = 'dep';
        headers[3] = 'blockOff';
        headers[4] = 'dest';
        headers[5] = 'blockOn';
        debug(headers)
    })
    .on('data', (data) => {
        // Push each row to the results array
        debug(data)
        results.push(data);
    })
    .on('end', () => {
        debug(results.length)
        for (let i = 0; i < results.length; i++) {
            debug("end", results[i].date)
            try {
                // console.log("BIGBOY ",results[i])
                const [day, month, year] = results[i].date.split('/').map(Number);
                if (isNaN(day) || isNaN(month) || isNaN(year))
                    continue
                const dateArray = [year, (month - 1), day];

                const depNumber = results[i].blockOff
                const arrNumber = results[i].blockOn
                // console.log(depNumber)
                // console.log(arrNumber)
                if (!depNumber || !arrNumber)
                    continue
                const depFirstNumber = Math.floor(depNumber / 100);
                const depSecondNumber = depNumber % 100;
                const depTime = dateArray.concat([depFirstNumber, depSecondNumber, 0]);

                const arrFirstNumber = Math.floor(arrNumber / 100);
                const arrSecondNumber = arrNumber % 100;
                const arrTime = dateArray.concat([arrFirstNumber, arrSecondNumber, 0]);

                const [cmdWrongFormat, ...restOfCrewWrongFormat] = results[i].AllCrew.split(', ').map(f => { return f.toUpperCase() })
                const cmd = convertName(cmdWrongFormat)
                const restOfCrew = restOfCrewWrongFormat.map(f => convertName(f))
                debug(cmd)
                debug("call")
                makeLogbookEntry(
                    dateArray,
                    results[i].reg,
                    results[i].FlightNo,
                    results[i].dep,
                    depTime,
                    results[i].dest,
                    arrTime,
                    cmd,
                    restOfCrew,
                )
            } catch { pass }

        }
    });

const PORT = process.env.PORT || 3000;

app.get('/api/toplist', async (req, res) => {
    const bigboy = await LogbookEntry.aggregate([{ $addFields: { flightcrew: { $concatArrays: ['$flightcrew', ['$cmd']] } } }, { $unwind: '$flightcrew' }, { $group: { _id: "$flightcrew", totalTime: { $sum: "$blocktimeMinutes" } } }, { $sort: { totalTime: -1 } }])

    for (let index = 0; index < bigboy.length; index++) {
        bigboy[index].totalTime = [Math.floor(bigboy[index].totalTime / 60), (bigboy[index].totalTime % 60)]
    }
    debug(bigboy)
    res.send(bigboy)

})

// lägg till ett wildcard här direkt i url:en
app.get('/api/logbook/:name', async (req, res) => {
    debug("App get logbook")
    debug(req.params)//TOM e. kanske ska vara så här
    debug(req.params.name)//TOM e. kanske ska vara så här
    // finns tillgänglig i req.query
    const name = req.params.name.toString()
    console.log(name)
    debug(name)
    //flighcrew är en array därav elemMatch
    const bigboy = await LogbookEntry.find({
        $or: [
            { cmd: { $regex: name, $options: 'i' } },
            { flightcrew: { $elemMatch: { $regex: name, $options: 'i' } } }]
    }).sort({ blockOff: 1 })
    debug(bigboy.slice(0, 2))
    res.send(bigboy)

})

app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})