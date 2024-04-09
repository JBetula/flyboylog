const mongoose = require('mongoose');
const AirportEntry = require('./models/airportsModel.js');
const fs = require('fs');
const csv = require('csv-parser');
const { connectDB } = require('./db.js');
connectDB()
// Function to import data from CSV to MongoDB
async function importData() {
    const data = [];

    // Read data from CSV file
    fs.createReadStream('airports.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Map CSV columns to your Mongoose model properties
            if (row.continent == 'EU') {
                data.push({
                    ICAO: row.ident,
                    lat: parseFloat(row.latitude_deg),
                    long: parseFloat(row.longitude_deg),
                    country: row.iso_country,
                    name_eng: row.name,
                });
            }
        })
        .on('end', async () => {
            // Insert data into MongoDB
            await AirportEntry.insertMany(data);
            console.log('Data imported successfully.');
            mongoose.disconnect();
        });
}

// Run the import function
importData();
