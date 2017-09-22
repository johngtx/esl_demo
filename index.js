/**
 * Created by john on 8/25/17.
 */
'use strict';
const esl = require('modesl');
const xml = require('xml');

require('./common/common')();
const HttpServer = require('./interface/http_server');
const WSServer = require('./interface/ws_server');
const EslConnection = require('./controler/esl_connection');

//entry
(function() {
    //init server
    let http_server = new HttpServer({port: 40096});
    let ws_server = new WSServer({http_server: http_server.GetApp()});
    //init global configuration
    _InitApplication({
        HttpServerInstance: http_server,
        WSServerInstance: ws_server,
        Configuration: {
            enable_ws: true,
            enable_mqtt: false,
            record_path: './record'
        },
        EslConnections: []
    });

    // //connect to freeswitch server
    // let esl = new EslConnection().Connect({
    //     ip: '127.0.0.1',
    //     port: 8021,
    //     pwd: 'ClueCon'
    // }).then( conn => {
    //     console.log('connect to server success:', conn.ID);
    //     _GetApplication().EslConnections.push(conn);
    // }, error => {
    //     console.log('connect to server failed:', error);
    // }).catch( e => {
    //     console.log(e);
    // });

}());