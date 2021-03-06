//FreeSWITCH mod_json_cdr / mod_xml_cdr
const Router = require('router');
const BodyParser = require('body-parser');
const CdrApi = require('../controler/fscdr_api');

module.exports = function () {
    let router = Router();

    //router.use(BodyParser.json());
    router.post('/', (req, res) => {
        console.log('fscdr router post /');
        let alldata = '';
        req.on('data', data => {
            alldata += data;
        });
        req.on('end', () => {
            CdrApi.ProcessFsCdrData(alldata);
            alldata = '';
            res.end();
        });
    });

    router.get('/all', (req, res) => {
        //TODO
        console.log('fscdr router /all');
        res.end();
    });

    return router;
}();