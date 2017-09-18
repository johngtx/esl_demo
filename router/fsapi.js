//freeSWITCH mod_xml_curl
const Router = require('router');
const Url = require('url');
const FsApi = require('../proxy/fsconfig_api');

module.exports = function () {
    let router = Router();

    router.get('/dialplan', (req, res) => {
        //TODO
        console.log('fs api router /dialplan');
        res.end();
    });

    router.get('/directory', (req, res) => {
        console.log('1111');
        let params = Url.parse(req.url, true).query;
        let content = FsApi.GetFsDirectory(params);
        console.log(params);
        console.log(content);
        
        res.write(content);
        res.end();
    });

    router.post('/directory', (req, res) => { 
        console.log('2222');
        //TODO 
        res.end(); 
    });

    return router;
}();