/**
 * Created by john on 8/30/17.
 */
const url = require('url');
const ConfProxyFactory = require('./conference_proxy');
const PttConfProxyFactory = require('./ptt_conference_proxy');
const EventNoticeApi = require('../interface/event_notice_api');

const IProxyInterface = module.exports = function () {};

IProxyInterface.prototype.DispatchRequest = function (buff) {
    let data = {};
    try {
        data = JSON.parse(buff);
    } catch (e) {
        console.log(e);
        return;
    }

    switch (data.type) {
        case 'conference':
            //TODO
            ConfProxyFactory.GetInstance(0).Command(data, ret => {
                EventNoticeApi.SendNotice(ret);
            });
            break;
        case 'ptt':
            //TODO
            PttConfProxyFactory.GetInstance(0).Command(data, ret => {
                EventNoticeApi.SendNotice(ret);
            });
            break;
        default:
            //TODO
            return;
    }
};

IProxyInterface.prototype.DispatchRouter = function(req, res) {
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
};