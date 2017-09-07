const Router = require('router');

const EslApi = require('./eslapi');
const FsApi = require('./fsapi');
const FsCdr = require('./fscdr');

module.exports = function () {
    let router = Router();
    
    router.use('/eslapi', EslApi);
    router.use('/fsapi', FsApi);
    router.use('/fscdr', FsCdr);

    return router;
}();
