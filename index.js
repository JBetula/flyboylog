//TO ACTIVATE DEBUG WRIGHT "export DEBUG=debug"
const debug = require('debug')('debug')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//To parse json
app.use(express.json())

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
    cmd: String,
    flightcrew: [{type: String}],
})

const LogbookEntry = mongoose.model('logbook', logbookSchema)

async function makeLogbookEntry(date, reg, flightNumber, depature, offBlock, destination, blocksOn, cmd,flightcrew) {
    const offBlockPlaceholder = new Date(...offBlock)
    const onBlockPlaceholder = new Date(...blocksOn)
    const blocktimePlaceholder = new Date(onBlockPlaceholder - offBlockPlaceholder)

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
        cmd: cmd,
        flightcrew: [...flightcrew],
    })
    const result = await entry.save()
    debug(result)
}

makeLogbookEntry([2022, 10, 10, 0, 0, 0], "SE-DEV", "NAX13", "UME", [2022, 10, 10, 12, 10, 30], "LLA", [2022, 10, 10, 15, 10, 30], "jojje",["bigboy","smallboy"])

const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('./docker/org_logbook.csv')
    .pipe(csv())
    .on('headers', (headers) => {
        // Rename the first column to "date"
        headers[0] = 'date';
        headers[1] = 'reg';
        headers[2] = 'dep';
        headers[3] = 'blockOff';
        headers[4] = 'dest';
        headers[5] = 'blockOn';
    })
    .on('data', (data) => {
        // Push each row to the results array
        results.push(data);
    })
    .on('end', () => {
        for (let i = 0; i < results.length; i++){ 
            const [day, month, year] = results[i].date.split('/').map(Number);
            const dateArray = [year, (month-1), day];

            const depNumber = results[i].blockOff
            const arrNumber = results[i].blockOn

            const depFirstNumber = Math.floor(depNumber / 100);
            const depSecondNumber = depNumber % 100;
            const depTime = dateArray.concat([depFirstNumber, depSecondNumber,0]);

            const arrFirstNumber = Math.floor(arrNumber / 100);
            const arrSecondNumber = arrNumber % 100;
            const arrTime = dateArray.concat([arrFirstNumber, arrSecondNumber,0]);

            const [cmd, ...restOfCrew] = results[i].AllCrew.split(', ')

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
        }
    });

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.send('Hello World!')
})



app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})