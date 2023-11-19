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
        date: new Date(...date),
        reg: reg,
        flightNumber: flightNumber,
        depature: depature,
        offBlock: offBlockPlaceholder,
        // offBlock: new Date(...offBlock),
        destination: destination,
        blocksOn: onBlockPlaceholder,
        // blocksOn: new Date(...blocksOn),
        blocktime: blocktimePlaceholder,
        cmd: cmd,
        flightcrew: [...flightcrew],
    })
    const result = await entry.save()
    debug(result)
}

makeLogbookEntry([2022, 10, 10, 0, 0, 0], "SE-DEV", "NAX13", "UME", [2022, 10, 10, 12, 10, 30], "LLA", [2022, 10, 10, 15, 10, 30], "jojje",["bigboy","smallboy"])

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.send('Hello World!')
})



app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})