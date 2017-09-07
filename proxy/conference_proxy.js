/**
 * Created by john on 8/28/17.
 */
const NoticeApi = require('../interface/event_notice_api');
const CONF_ACTION = require('../common/esl_header').ESL_CONFERENCE_ACTION;

let proxy_array_ = [];
module.exports = class ConferenceProxy {
    constructor(esl) {
        this.esl_ = esl;
    }

    GetConfList() {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                self.esl_.api("conference json_list", res => {
                    console.log(res.getBody());
                    let data = JSON.parse(res.getBody());
                    let list = [];
                    for (let i = 0; i < data.length; ++i) {
                        let conf = data[i];
                        if (conf.conference_name.match('^90\\d{4}$')) {
                            list.push(conf);
                        }
                    }
                    resolve(list);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    ProcessEvent(event) {
        let obj = _GetConferenceMaintenanceHeader(event);
        console.log('ConferenceProxy::ProcessEvent', obj.action);
        NoticeApi.SendNotice({
            type:       'conference',
            action:     obj.action,
            msg:        'ok',
            code:       '200',
            data:       obj
        });
    }

    Command(data) {
        let self = this;
        let command = get_command.call(self, data);

        return new Promise((resolve, reject) => {
            try {
                self.esl_.api(command, res => {
                    resolve({
                        type: 'conference',
                        action: data.action,
                        msg: 'success',
                        code: '200',
                        data: res.getBody()
                    });
                });
            } catch (e) {
                console.log(e);
                reject({
                    type: 'conference',
                    action: data.action,
                    msg: e.message,
                    code: '300',
                    data: resizeBy.getBody()
                });
            }
        });
    }
};

//private
function get_command(data) {
    let self = this;
    let command = "conference " + data.conference_name + " " + data.action + " ";
    
    switch (data.action) {
        case CONF_ACTION.DEAF:
        case CONF_ACTION.MUTE:
        case CONF_ACTION.UNDEAF:
        case CONF_ACTION.UNMUTE:
        case CONF_ACTION.HUP:
        case CONF_ACTION.KICK:
            command += data.member_id;
            break;
        case CONF_ACTION.DTMF:
        case CONF_ACTION.ENERGY:
        case CONF_ACTION.VOLUME_IN:
        case CONF_ACTION.VOLUME_OUT:
        case CONF_ACTION.SAYMEMBER:
            command += data.member_id + " " + data.value;
            break;
        case CONF_ACTION.RECORDING:
            command += data.option + data.value;
            break;
        case CONF_ACTION.LOCK:
        case CONF_ACTION.UNLOCK:
            command += '';
            break;
        default:

    }

    return command;
}