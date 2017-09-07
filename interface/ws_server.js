/**
 * Created by john on 8/30/17.
 */
const http = require('http');
const WebSocketServer = require('websocket').server;

module.exports = class WSServer{
    constructor(config){
        let self = this;
        self.connection_list_ = [];

        self.ws_server = new WebSocketServer({
            httpServer: config.http_server,
            autoAcceptConnections: false
        });
        self.ws_server.on('request', req => {
            if (!self.check_request_origin(req.origin)) {
                console.log('connection reject:', req.origin);
                req.reject();
                return;
            }

            //accept
            let connection = req.accept('echo-protocol', req.origin);
            self.connection_list_.push(connection);

            //received message
            connection.on('message', message => {
                console.log('received message:', message.utf8Data);
                connection.sendUTF('hello world');
                //TODO
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
        });
    }

    SendNotification(data) {
        let self = this;
        for (let i = 0; i < self.connection_list_.length; ++i) {
            let conn = self.connection_list_[i];
            conn.sendUTF(JSON.stringify(data));
        }
    }
}

//private
function check_request_origin(origin) {
    let self = this;
    console.log('WSServer::check_request_origin ', origin);
    return true;
};