/**
 * Created by john on 8/30/17.
 */
const WebSocketServer = require('websocket').server;
const http = require('http');
const RequestInterface = require('./request_interface');


let WSServer = function() {
    this.connection_list_ = [];
};

WSServer.prototype.Init = function (config) {
    let self = this;

    if (!config.http_server) {
        throw 'WS_INIT_ERROR';
    } else {
        self.ws_server = new WebSocketServer({
            httpServer: config.http_server,
            autoAcceptConnections: false
        });

        self.ws_server.on('request', req => {
            console.log('1111');
            if (!self.check_request_origin(req.origin)) {
                req.reject();
                console.log('connection reject:', req.origin);
            }

            //accept
            let connection = req.accept('echo-protocol', req.origin);
            console.log('connection accept:', req.origin);

            //received message
            connection.on('message', message => {
                console.log('received message:', message.utf8Data);
                connection.sendUTF('hello world');
                //TODO
                RequestInterface.DispatchRequest(message);
            });

            //connection close
            connection.on('close', (code, dsr) => {
                console.log('connection closed:', connection.remoteAddress);

                for (let i = 0; i < self.connection_list_.length; ++i) {
                    let conn = self.connection_list_[i];
                    if (conn === connection) {
                        self.connection_list_.splice(i, 1);
                        break;
                    }
                }
            });

            //store connection
            self.connection_list_.push(connection);
        });
    }

};

WSServer.prototype.SendNotification = function (data) {
    let self = this;

    for (let i = 0; i < self.connection_list_.length; ++i) {
        let conn = self.connection_list_[i];
        conn.sendUTF(JSON.stringify(data));
    }
};

WSServer.prototype.check_request_origin = function (origin) {
    return true;
};

//export
let ws_server = new WSServer();
module.exports =  ws_server;