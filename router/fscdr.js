//FreeSWITCH mod_json_cdr / mod_xml_cdr
const Router = require('router');
const BodyParser = require('body-parser');
const CdrApi = require('../proxy/fscdr_api');

module.exports = function () {
    let router = Router();

    router.use(BodyParser.json());
    router.post('/', (req, res) => {
        //TODO
        console.log('fscdr router /');
        CdrApi.ProcessFsCdrData(req.body);
        res.end();
    });

    router.get('/all', (req, res) => {
        //TODO
        console.log('fscdr router /all');
        res.end();
    });

    return router;
}();