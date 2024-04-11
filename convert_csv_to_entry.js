const fs = require('fs');
const csv = require('csv-parser');
const { debug, debugDB } = require('./debug.js')
const LogbookEntry = require('./models/logbookModel');

async function makeLogbookEntry(date, reg, flightNumber, departure, offBlock, destination, blocksOn, cmd, flightcrew) {
    const offBlockPlaceholder = new Date(...offBlock)
    const onBlockPlaceholder = new Date(...blocksOn)
    const blocktimePlaceholder = new Date(onBlockPlaceholder - offBlockPlaceholder)
    const blocktimeMinutesPlaceholder = (blocktimePlaceholder.getUTCMinutes() + (blocktimePlaceholder.getUTCHours() * 60))
    
    const entry = new LogbookEntry({
        // Input in UTC
        // date: new Date(Date.UTC(...date)),
        // Input in Local
        date: new Date(Date.UTC(...date)),
        reg: reg,
        flightNumber: flightNumber,
        departure: departure,
        offBlock: offBlockPlaceholder,
        destination: destination,
        blocksOn: onBlockPlaceholder,
        blocktime: blocktimePlaceholder,
        blocktimeMinutes: blocktimeMinutesPlaceholder,
        cmd: cmd,
        flightcrew: [...flightcrew],
    })
    try {
        const result = await entry.save()
        debug("SAVED", entry.date.toDateString(), entry.flightNumber.toString())
    } catch (error) {
        debug(error.message)
    }
}

function convertName(input) {
    // Split the input into parts
    const parts = input.split(" ");
    if (parts.length == 1)
        return toString(parts)
    // Take the first letter of the first name and concatenate it with the last name in uppercase
    const output = parts[0].charAt(0).toUpperCase() + ". " + parts[1].toUpperCase();

    return output;
}

function readCSV(pathToFile) {
    const results = [];
    fs.createReadStream(pathToFile)
        .pipe(csv())
        .on('headers', (headers) => {
            headers[0] = 'date';
            headers[1] = 'reg';
            headers[2] = 'dep';
            headers[3] = 'blockOff';
            headers[4] = 'dest';
            headers[5] = 'blockOn';
        })
        .on('data', (data) => {
            debug(data)
            results.push(data);
        })
        .on('end', () => {
            for (let i = 0; i < results.length; i++) {
                debug("end", results[i].date)
                try {
                    const [day, month, year] = results[i].date.split('/').map(Number);
                    if (year.length > 4)
                        year.slice(0, 4)
                    if (isNaN(day) || isNaN(month) || isNaN(year))
                        continue
                    const dateArray = [year, (month - 1), day];

                    const depNumber = results[i].blockOff
                    const arrNumber = results[i].blockOn
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
                } catch { console.log(error.message) }

            }
        },
        );
    return results
}

module.exports = { makeLogbookEntry, convertName, readCSV };