const LogbookEntry = require('../models/logbookModel');
const AirportEntry = require('../models/airportsModel');
const { debug } = require('../debug')

const routesByNrOfsectors = async (req, res) => {
    const name = req.query.name
    const airport = req.query.airport // NEED TO JOI
    const bigboy = await LogbookEntry.aggregate([
        {
            $match: {
                $or: [
                    { cmd: { $regex: name, $options: 'i' } },
                    { flightcrew: { $elemMatch: { $regex: name, $options: 'i' } } }
                ]
            }
        },
        {
            $addFields: {
                route: {
                    $cond: {
                        if: { $in: ["ESNU", ["$departure", "$destination"]] },
                        then: {
                            $cond: {
                                if: { $eq: ["$departure", "ESNU"] },
                                then: ['$departure', '$destination'],
                                else: ['$destination', '$departure']
                            }
                        },
                        else: {
                            $cond: {
                                if: { $lt: [{ $strcasecmp: ["$departure", "$destination"] }, 0] },
                                then: ['$departure', '$destination'],
                                else: ['$destination', '$departure']
                            }
                        }
                    }
                },
            }
        },
        {
            $group: {
                _id: "$route", sectors: { $sum: 1 }
            }
        },
        { $sort: { sectors: -1 } },
        ...(airport ? [{ $match: { _id: { $in: [airport] } } }] : [])
    ]);
    
    const uniqueAirports = Array.from(
        new Set(bigboy.flatMap(entry => entry._id))
    );


    console.log(
        // bigboy
        // uniqueArray
    )
    const airportCoords = await AirportEntry.find({ ICAO: { $in: uniqueAirports } }, 'ICAO lat long');
    const modifiedAirportCoords = airportCoords.map(airport => ({
            _id:  airport.ICAO,
            lat: airport.lat,
            long: airport.long
    }
    )) 
    res.json({ sectors: bigboy, modifiedAirportCoords })


}


module.exports = { routesByNrOfsectors }