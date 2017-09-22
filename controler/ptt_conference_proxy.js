/**
 * Created by john on 8/28/17.
 */
const NoticeApi = require('../interface/event_notice_api');

module.exports = class PttConferenceProxy{
    constructor(esl) {
        this.esl_ = esl;
    }

    GetPttList() {
        let self = this;
        return new Promise( (resolve, reject) => {
            try {
                self.esl_.api("conference json_list", res => {
                    let data = JSON.parse(res.getBody());
                    let list = [];
                    for (let i = 0; i < data.length; ++i) {
                        let conf = data[i];
                        if (conf.conference_name.match('^80\\d{4}$')) {
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

    DTMFFilter(event) {
        let self = this;
        let dtmf = _GetDTMFHeader(event);

        change_ptt_speaking_right.call(self, dtmf.caller_dest_number, dtmf);
    }

    ProcessEvent(event) {
        let self = this;
        let obj = _GetConferenceMaintenanceHeader(event);

        switch (obj.action) {
            case 'add-member':
                on_add_member.call(this, obj);
                break;
            case 'del-member':
                on_del_member.call(this, obj);
                break;
            case 'mute-member':
                on_mute_member.call(this, obj);
                break;
            case 'unmute-member':
                on_unmute_member.call(this, obj);
                break;
            case 'kick-member':
                on_kick_member.call(this, obj);
                break;
            case 'start-talking':
            case 'stop-talking':
                NoticeApi.SendNotice({
                    type:       'ptt',
                    action:     obj.action,
                    msg:        'ok',
                    code:       '200',
                    data:       obj
                });
                console.log(obj.action);
                break;
            default:
        }
    }

    Command(data) {
        let self = this;
        return new Promise((resolve, reject) => {
            resolve({
                type: 'ptt',
                action: data.action,
                msg: 'test message',
                code: '100',
                data: data 
            });
        });
    }
}

//private
function get_ptt_speaking_right_status(confname, uuid) {
    let self = this;
    let status = false;
    let member_id = '';
    let member_talker = '';
    let confobj = {};

    return new Promise((resolve, reject) => {
        try {                
            self.esl_.api("conference json_list", res => {
                try { let data = JSON.parse(res.getBody()); } 
                catch (e) { reject(e); }
               
                for (let i = 0; i < data.length; ++i) {
                    let conf = data[i];
                    if (conf.conference_name === confname) {
                        for (let i = 0; i < conf.members.length; ++i) {
                            let member = conf.members[i];
                            if (member.uuid === uuid) {
                                member_id = member.id;
                            }
                            if (member.flags.can_speak === true) {
                                status = true;
                                member_talker = member.uuid;
                            }
                        }

                        confobj = conf;
                        break;
                    }
                }
                resolve([confobj, status, member_id, member_talker]);
            });
        } catch (e) {
            reject(e);
        }
    });
};

function change_ptt_speaking_right(confname, dtmf) {
    let self = this;
    let flag = '';

    get_ptt_speaking_right_status.call(self, confname, dtmf.caller_uuid).then((data) => {
        let [conf, status, member_id, member_talker] = data;
        //TODO
        switch (dtmf.dtmf_digit) {
            case '*':
                flag = 'speaking-right-on';
                if (status) {
                    return;
                } else {
                    command = 'conference ' + conf.conference_name +
                        ' unmute ' + member_id;
                }
                break;
            case '#':
                flag = 'speaking-right-off';
                if (status && member_talker === dtmf.caller_uuid) {
                    command = 'conference ' + conf.conference_name +
                        ' mute ' + member_id;
                } else {
                    return;
                }
                break;
            default:
                return;
        }

        try {
            self.esl_.api(command, res => {
                //TODO
                NoticeApi.SendNotice({
                    type: 'ptt',
                    action: flag,
                    msg: 'ok',
                    code: '200',
                    data: {
                        conference_name: conf.conference_name,
                        conference_uuid: conf.conference_uuid,
                        caller_uuid: dtmf.caller_id_name,
                        caller_name: dtmf.caller_id_number,
                        caller_number: dtmf.caller_id_name,
                        caller_dst_num: dtmf.caller_dest_number,
                        member_id: member_id
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    });
};

function on_add_member(obj) {
    let self = this;
    //TODO
    try {
        let command =
            'conference ' + obj.conference_name + ' mute ' + obj.member_id;
        self.esl_.api(command, res => {
            console.log('mute member...');
        });
    } catch (e) {
        console.log(e);
    }
};

function on_del_member(obj) {
    //TODO
    let self = this;
    let conf, status, member_id, member_talker;
    get_ptt_speaking_right_status.call(self, obj.conference_name, obj.caller_uuid).then(data => {
        [conf, status, member_id, member_talker] = data;
    });

    if (obj.member_id === member_id) {
        NoticeApi.SendNotice({
            type: 'ptt',
            action: 'speaking-right-off',
            msg: 'ok',
            code: '200',
            data: obj
        });
    }
};

function on_mute_member(obj) {
    console.log('Conference mute member:', obj.caller_name, obj.conference_name);
    NoticeApi.SendNotice({
        type: 'ptt',
        action: 'stop-talking',
        msg: 'ok',
        code: '200',
        data: obj
    });
};

function on_unmute_member(obj) {
    console.log('Conference unmute member:', obj.caller_name, obj.conference_name);
};

function on_kick_member(obj) {
    //TODO
    let self = this;
    let conf, status, member_id, member_talker;
    get_ptt_speaking_right_status.call(self, obj.conference_name, obj.caller_uuid).then( data => {
        [conf, status, member_id, member_talker] = data;
    });

    if (obj.member_id === member_id) {
        NoticeApi.SendNotice({
            type: 'ptt',
            action: 'speaking-right-off',
            msg: 'ok',
            code: '200',
            data: obj
        });
    }
};