/**
 * Created by john on 8/25/17.
 */

'use strict';

require('./common/common')();
let esl = require('modesl');

const HttpServer = require('./interface/http_server');
const WSServer = require('./interface/ws_server');

HttpServer.Init({port: 40096});
WSServer.Init({http_server: HttpServer.GetApp()});

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

        _ControlerFactory.GetConferenceProxy().Init(conn);
        _ControlerFactory.GetPttConferenceProxy().Init(conn);

        conn.on('esl::event::CUSTOM::*', event => {
            if (event.getHeader('Event-Subclass') === 'conference::maintenance') {
                let conf_name = event.getHeader('Conference-Name');

                if (conf_name.match('^90\\d{4}$')) {
                    _ControlerFactory.GetConferenceProxy().ProcessEvent(event);
                } else if (conf_name.match('^80\\d{4}$')) {
                    _ControlerFactory.GetPttConferenceProxy().ProcessEvent(event);
                } else {
                    console.log('unknow event');
                    console.log(conf_name);
                }
            }
        });

        conn.on('esl::event::DTMF::*', event => {
            _ControlerFactory.GetPttConferenceProxy().DTMFFilter(event);
        });
    });

});
