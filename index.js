//TO ACTIVATE DEBUG WRIGHT "export DEBUG=debug"
const debug = require('debug')('debug')
const express = require('express')
const app = express()

//To parse json
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})