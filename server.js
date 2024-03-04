const { debug } = require('./debug.js')
const logbookRoutes = require('./routes/logbookRoutes.js');
const dataRoutes = require('./routes/dataRoutes.js');
const { connectDB } = require('./db.js')

const entryinsert = require('./convert_csv_to_entry.js')
const PORT = process.env.PORT || 3000;
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/logbook', logbookRoutes)
app.use('/api/data', dataRoutes)
app.use('/', express.static('static'))



connectDB()
// entryinsert.readCSV('./downloads/input.csv')


app.listen(PORT, () => {
    debug(`Express listening on port ${PORT}`)
})