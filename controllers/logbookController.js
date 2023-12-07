const LogbookEntry = require('../models/logbookModel');
const { debug } = require('../debug')

const toplist = async (req, res) => {

    const bigboy = await LogbookEntry.aggregate(
        [{
            $addFields: {
                flightcrew:
                    { $concatArrays: ['$flightcrew', ['$cmd']] }
            }
        },
        { $unwind: '$flightcrew' }, {
            $group: {

                _id: "$flightcrew", totalTime:

                    { $sum: "$blocktimeMinutes" }
            }
        },
        {
            $sort:
                { totalTime: -1 }
        }]
    )


    for (let index = 0; index < bigboy.length; index++) {
        bigboy[index].totalTime = [Math.floor(bigboy[index].totalTime / 60), (bigboy[index].totalTime % 60)]
    }
    debug(bigboy)
    res.json(bigboy)

}

// app.get('/api/totalhours', async (req, res) => {
//     const name = req.query.name
//     const totalBoy = await LogbookEntry.aggregate([
//         {
//             $addFields:
//                 { flightcrew: { $concatArrays: ['$flightcrew', ['$cmd']] } }
//         }, {
//             $unwind: '$flightcrew'
//         }, {
//             $group: { _id: "$flightcrew", totalTime: { $sum: "$blocktimeMinutes" }, sectors: { $sum: 1 } }
//         },
//         {
//             $match: {
//                 _id: { $regex: name, $options: 'i' }
//             }
//         },
//     ])
//     if (!totalBoy[0]) {
//         return
//     }
//     totalBoy[0].totalTime = Math.floor(totalBoy[0].totalTime / 60)
//     res.send(totalBoy)
// })

// // new

const logbook = async (req, res) => {
    const name = req.query.name
    const logBoy = await LogbookEntry.find({
        $or: [
            { cmd: { $regex: name, $options: 'i' } },
            { flightcrew: { $elemMatch: { $regex: name, $options: 'i' } } }]
    }).sort({ blockOff: 1 })
    if (!logBoy[0]) {
        return
    }
    res.json(logBoy)
}

module.exports = { toplist, logbook }