//freeSWITCH mod_xml_curl
const Router = require('router');
const Url = require('url');
const FsApi = require('../controler/fsconfig_api');

module.exports = function () {
    let router = Router();

    router.get('/dialplan', (req, res) => {
        console.log('fs api router /dialplan');

        let params = Url.parse(req.url, true).query;
        let content = FsApi.GetFsDialplan(params);
        res.write(content);
        res.end();
    });

    router.get('/directory', (req, res) => {
        console.log('fs api get router /directory');

        let params = Url.parse(req.url, true).query;
        let content = FsApi.GetFsDirectory(params);
        res.write(content);
        res.end();
    });

    router.get('/configuration', (req, res) => {
        console.log('fs api get router /configuration');

        let params = Url.parse(req.url, true).query;
        let content = FsApi.GetFsConfiguration(params);
        res.write(content);
        res.end();
    });

    return router;
}();