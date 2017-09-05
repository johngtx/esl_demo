/**
 * Created by john on 8/30/17.
 */
const url = require('url');

const ConfProxyFactory = require('./conference_proxy');
const PttConfProxyFactory = require('./ptt_conference_proxy');
const EventNoticeApi = require('../interface/event_notice_api');

module.exports = {
    DispatchRequest : function (buff) {
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
    },
    
    DispatchRouter : function(req, res) {
        //TODO
        console.log('http request:', req.url);
        if (req.url.indexOf('/getconflist') === 0 && req.method === 'GET') {
            console.log('get conf list');
            ConfProxyFactory.GetInstance(0).GetConfList( data => {
                let content = JSON.stringify(data);
                res.write(content);
                res.end();
            });
        } else if (req.url.indexOf('/getpttlist') === 0 && req.method === 'GET') {
            console.log('get ptt list');
            PttConfProxyFactory.GetInstance(0).GetConfList( data => {
                let content = JSON.stringify(data);
                res.write(content);
                res.end();
            });
        } else if (req.url.indexOf('/cdr') === 0 && req.method === 'POST') {
            console.log('recv cdr post');
            res.writeHeader(200);
            res.end();

            //TODO
            let data = '';
            req.on('data', chunk => { data += chunk; });
            req.on('end', () => {
                console.log(data);
            });
        } else {
            console.log('unknow request router');
            res.writeHeader(404);
            res.end();
        }
    }
};