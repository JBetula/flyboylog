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
        bigboy[index].rank = index +1
    }
    debug(bigboy)
    res.json(bigboy)
}

const totalHours = async (req, res) => {
    const name = req.query.name
    const totalBoy = await LogbookEntry.aggregate([
        {
            $addFields:
                { flightcrew: { $concatArrays: ['$flightcrew', ['$cmd']] } }
        }, {
            $unwind: '$flightcrew'
        }, {
            $group: { _id: "$flightcrew", totalTime: { $sum: "$blocktimeMinutes" }, sectors: { $sum: 1 } }
        },
        {
            $match: {
                _id: { $regex: name, $options: 'i' }
            }
        },
    ])
    if (!totalBoy[0]) {
        return
    }
    totalBoy[0].totalTime = Math.floor(totalBoy[0].totalTime / 60)
    res.send(totalBoy)
}
const logbook = async (req, res) => {
    const name = req.query.name;

    try {
        const logBookEntries = await LogbookEntry.find({
            $or: [
                { cmd: { $regex: name, $options: 'i' } },
                { flightcrew: { $elemMatch: { $regex: name, $options: 'i' } } },
            ],
        }).sort({ blockOff: 1 });

        if (!logBookEntries[0]) {
            return res.status(404).json({ message: 'No entries found.' });
        }

        const aggregateQuery = [
            {
                $match: {
                    $or: [
                        { cmd: { $regex: name, $options: 'i' } },
                        { flightcrew: { $elemMatch: { $regex: name, $options: 'i' } } },
                    ],
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    totalBlocktimeMinutes: { $sum: '$blocktimeMinutes' },
                },
            },
            {
                $project: {
                    _id: 1,
                    totalBlocktimeHours: { $round: { $divide: ['$totalBlocktimeMinutes', 60] } },
                },
            },
            {
                $sort: {
                    '_id.year': -1,
                    '_id.month': -1,
                },
            },
        ];

        const monthlyTotals = await LogbookEntry.aggregate(aggregateQuery);

        return res.status(200).json({ logBookEntries, monthlyTotals });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { toplist, logbook, totalHours }