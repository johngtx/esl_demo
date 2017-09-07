//esl api
const Router = require('router');
const BodyParse = require('body-parser');

module.exports = function () {
    let router = Router();

    router.use(BodyParse.json());
    router.get('/getconflist', (req, res) => {
        _GetApplication().EslConnections[0].GetConfList().then(
            data => {
                //success
                console.log('conf list count ', data.length);
                let content = JSON.stringify(data);
                res.write(content);
                res.end();
            }, error => {
                //error occured
                console.log(error);
                res.writeHeader(404);
                res.end();
            }
        );
    });

    router.get('/getpttlist', (req, res) => {        
        _GetApplication().EslConnections[0].GetPttList().then(
            data => {
                //success
                console.log('ptt list count ', data.length);
                let content = JSON.stringify(data);
                res.write(content);
                res.end();
            }, error => {
                //error occured
                console.log(error);
                res.writeHeader(404);
                res.end();
            }
        );
    });

    router.post('/command', (req, res) => {
        //TODO
    });

    return router;
}();