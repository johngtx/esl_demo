/**
 * Created by john on 8/25/17.
 */

'use strict';

let esl = require('modesl');
let ConferenceProxy = require('./conference_proxy');

let conn = new esl.Connection('39.108.134.243', 8021, 'fs', () => {
    conn.api('version', res => {
        console.log("FreeSWITCH version:");
        console.log(res.getBody());
    });
    conn.api('sofia status', res => {
        console.log("FreeSWITCH status:");
        console.log(res.getBody());
    });

    conn.events('json', 'DTMF CUSTOM conference::maintenance', res => {

        let conf_proxy = new ConferenceProxy(conn);

        console.log(conf_proxy.GetList());

        conn.on('esl::event::CUSTOM::*', event => {
            conf_proxy.ProcessEvent(event);
        });

        conn.on('esl::event::DTMF::*', event => {
            console.log(event);
        });
    });

});
