/**
 * Created by john on 8/30/17.
 */
const http = require('http');
const finalhandler = require('finalhandler');
const router = require('../router/index');

module.exports = class HttpServer {
    constructor(config) {
        let self = this;
        let app = http.createServer((req, res) => {
            router(req, res, finalhandler(req, res));
        });
    
        self.server = app;
        app.listen(config.port || 40096);
        app.on('error', err => {
            if (err.syscall !== 'listen') {
                throw err;
            }
            //handle specific listen errors with friendly message
            switch (err.code){
                case 'EACCES':
                    console.error(port + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(port + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        app.on('listening', () => {
            console.log('http server is listening', config.port);
        });
    }

    GetApp() {
        return this.server;
    }
}