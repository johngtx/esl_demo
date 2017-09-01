/**
 * Created by john on 8/30/17.
 */
const url = require('url');

const RequestInterface = module.exports = {
    DispatchRequest: dispatch_conference_request,
    RequestRouter: conference_request_router
};

function dispatch_conference_request (buff) {

    let data = {};
    try {
        data = JSON.stringify(buff);
    } catch (e) {
        console.log(e);
    }

    switch (data.type) {
        case 'conference':
            _ControlerFactory.GetConferenceProxy().ProcessRequest(data);
            break;
        case 'ptt':
            _ControlerFactory.GetPttConferenceProxy().ProcessRequest(data);
            break;
        default:
            //TODO
            return;
    }
}

//http request router
function conference_request_router (req, res) {
    //TODO
    console.log('http request:', req.url);
    if (req.url.indexOf('/getconflist') === 0 && req.method === 'GET') {
        console.log('get conf list');
        _ControlerFactory.GetConferenceProxy().GetConfList( data => {
            let content = JSON.stringify(data);
            res.write(content);
            res.end();
        });
    } else if (req.url.indexOf('/getpttlist') === 0 && req.method === 'GET') {
        console.log('get ptt list');
        _ControlerFactory.GetPttConferenceProxy().GetConfList( data => {
            let content = JSON.stringify(data);
            res.write(content);
            res.end();
        });
    } else {
        console.log('22222');
        res.writeHeader(404);
        res.end();
    }
}