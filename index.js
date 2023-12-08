const { debug } = require('./debug.js')
const logbookRoutes = require('./routes/logbookRoutes.js');
const connectDB = require('./db.js')

const PORT = process.env.PORT || 3000;
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api', logbookRoutes)
app.use('/', express.static('static'))

connectDB()

app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})