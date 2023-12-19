const mongoose = require('mongoose');

// Define the schema
const airportSchema = new mongoose.Schema({
    ICAO: { type: String, required: true },
    name_eng: { type: String},
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    country: { type: String, required: true },
});

airportSchema.index({ ICAO: 1 }, { unique: true }); 
const AirportEntry = mongoose.model('airport', airportSchema);

module.exports = AirportEntry;
