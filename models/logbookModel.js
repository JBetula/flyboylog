const mongoose = require('mongoose')

const logbookSchema = new mongoose.Schema({
    date: Date,
    reg: String,
    flightNumber: String,
    departure: String,
    offBlock: Date,
    destination: String,
    blocksOn: Date,
    blocktime: Date,
    blocktimeMinutes: Number,
    cmd: String,
    flightcrew: [{ type: String }],
})

logbookSchema.index({ offBlock: 1, reg: 1 }, { unique: true })
const LogbookEntry = mongoose.model('logbook', logbookSchema)

module.exports = LogbookEntry;