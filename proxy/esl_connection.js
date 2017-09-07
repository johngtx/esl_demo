//proxy instance mamager
const Esl = require('modesl');
const ConferenceProxy = require('./conference_proxy');
const PttProxy = require('./ptt_conference_proxy');

module.exports =  class EslConnection{
    constructor() {
        this.opt_ = {};
        this.ID = -1;
    }

    Connect(opt) {
        let self = this;

        return new Promise((resolve, reject) => {
            let ip = opt.ip || '127.0.0.1';
            let port = opt.port || 8021;
            let pwd = opt.pwd || 'ClueCon';
    
            try {
                let conn = new Esl.Connection(ip, port, pwd, () => {
                    self.ID = _GenerateUUID();
                    self.ConfProxy = new ConferenceProxy(conn);
                    self.PttProxy = new PttProxy(conn);

                    conn.events('json', 'DTMF CUSTOM conference::maintenance', res => {
                        conn.on('esl::event::CUSTOM::*', event => {
                            if (event.getHeader('Event-Subclass') === 'conference::maintenance') {
                                conference_maintenance_event_dispatch.call(this, event);
                            }
                        });
                
                        conn.on('esl::event::DTMF::*', event => {
                            if (check_event_type.call(self, event.getHeader('Caller-Destination-Number'))) {
                                self.PttProxy.DTMFFilter(event);
                            }
                        });
                    });
    
                    resolve(self);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    ReConnect() {
        //TODO
    }

    //interface
    GetConfList() {
        return this.ConfProxy.GetConfList();
    }

    GetPttList() {
        return this.PttProxy.GetPttList();
    }
};

function conference_maintenance_event_dispatch(event) {
    let self = this;
    let conf_name = event.getHeader('Conference-Name');

    if (check_event_type.call(self, conf_name) === 'conference') {
        self.ConfProxy.ProcessEvent(event);
    } else if (check_event_type.call(self, conf_name) === 'ptt') {
        self.PttProxy.ProcessEvent(event);
    } else {
        console.log('EslConnection unknow conf name', conf_name);
    }
}

function check_event_type(str) {
    let self = this;

    if (str.match('^90\\d{4}$')) {
        return 'conference';
    } else if (str.match('^80\\d{4}$')) {
        return 'ptt';
    } else {
        return 'errtype';
    }
}