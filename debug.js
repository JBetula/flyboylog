// export DEBUG="debug db router"
const motherbug = require('debug');
const debug = motherbug('debug')
const debugDB = motherbug('db')
const debugRouter = motherbug('router')
const debugDownHeadless = motherbug('download')

module.exports = {
    debug,
    debugDB,
    debugRouter,
    debugDownHeadless
};

