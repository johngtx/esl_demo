//freeSWITCH mod_xml_curl
const Router = require('router');
const BodyParse = require('body-parser');
const FsApi = require('../proxy/fsconfig_api');

module.exports = function () {
    let router = Router();

    router.use(BodyParse.json());
    router.get('/dialplan', (req, res) => {
        //TODO
        console.log('fs api router /dialplan');
        res.end();
    });

    router.get('/directory', (req, res) => {
        //TODO
        console.log('fs api router /directory');
        res.end();
    });

    return router;
}();