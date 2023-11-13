//TO ACTIVATE DEBUG WRIGHT "export DEBUG=debug"
const debug = require('debug')('debug')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//To parse json
app.use(express.json())

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
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
    flightcrew: [String],
})


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    
    res.send('Hello World!')
})



app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})