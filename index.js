/**
 * Created by john on 8/25/17.
 */

'use strict';

require('./common/common');
let esl = require('modesl');

const HttpServer = require('./interface/http_server');
const WSServer = require('./interface/ws_server');
const ConfProxyFactory = require('./proxy/conference_proxy');
const PttProxyFactory = require('./proxy/ptt_conference_proxy');

//init server
function init_app () {
    const http_server = new HttpServer();
    const ws_server = new WSServer();
    
    http_server.Init({port: 40096});
    ws_server.Init({http_server: http_server.GetApp()});

    _InitApplication({
        HttpServerInstance: http_server,
        WSServerInstance: ws_server,
        Configuration: {
            enable_ws: true,
            enable_mqtt: false
        }
    });
};

init_app();
//connect to freeSWITCH server
let conn = new esl.Connection('39.108.134.243', 8021, 'fs', () => {
    conn.api('version', res => {
        console.log("FreeSWITCH version:");
        console.log(res.getBody());
    });
    conn.api('sofia status', res => {
        console.log("FreeSWITCH status:");
        console.log(res.getBody());
    });

    conn.api('conference list', res => {
        console.log('Conference list:');
        console.log(res.getBody());
        console.log('=====================================================');
    });

    conn.events('json', 'DTMF CUSTOM conference::maintenance', res => {
        let conf_proxy = ConfProxyFactory.CreateProxy(conn);
        let ptt_proxy = PttProxyFactory.CreateProxy(conn);

        conn.on('esl::event::CUSTOM::*', event => {
            if (event.getHeader('Event-Subclass') === 'conference::maintenance') {
                let conf_name = event.getHeader('Conference-Name');

                if (conf_name.match('^90\\d{4}$')) {
                    conf_proxy.ProcessEvent(event);
                } else if (conf_name.match('^80\\d{4}$')) {
                    ptt_proxy.ProcessEvent(event);
                } else {
                    console.log('unknow event');
                    console.log(conf_name);
                }
            }
        });

        conn.on('esl::event::DTMF::*', event => {
            ptt_proxy.DTMFFilter(event);
        });
    });

});
