/**
 * Created by john on 8/28/17.
 */

let PttConferenceProxy = module.exports = function (esl) {
    let self = this;

    self.esl = esl;
    self.ptt_status = [];
};

PttConferenceProxy.prototype.DTMFFilter = function (event) {
    let self = this;
    let dtmf = _GetDTMFHeader(event);

    //TODO
    try {
        self.esl.api('conference json_list', res => {
            let res_data = JSON.parse(res.getBody());
            for (let i = 0; i < res_data.length; ++i) {
                let conf = res_data[i];
                if (conf.conference_name.match('^80\\d{4}$')) {
                    self.change_ptt_speaking_right(conf, dtmf);
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

PttConferenceProxy.prototype.get_ptt_speaking_right_status = function(conf, uuid) {
    let status = false;
    let member_id = undefined;

    if (conf.hasOwnProperty('members')) {
        for (let i = 0; i < conf.members.length; ++i) {
            let member = conf.members[i];
            if (member.uuid === uuid) member_id = member.id;
            if (member.flags.can_speak === true) status = true;
        }
    }

    return [status, member_id];
};

PttConferenceProxy.prototype.change_ptt_speaking_right = function (conf, dtmf) {
    let self = this;

    let [status, member_id] = self.get_ptt_speaking_right_status(conf, dtmf.caller_uuid);
    console.log('st:', member_id, status);

    //TODO
    switch (dtmf.dtmf_digit) {
        case '*':
            if (status) {
                return;
            } else {
                command = 'conference ' + conf.conference_name +
                    ' unmute ' + member_id;
            }
            break;
        case '#':
            if (status) {
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
        console.log('command:', command);
        self.esl.api(command, res => {
            //console.log(res);
        });
    } catch (e) {
        console.log(e);
    }
};

PttConferenceProxy.prototype.ProcessEvent = function (event) {
    let event_act = event.getHeader('Action');
    let data_obj = _GetConferenceMaintenanceHeader(event);

    switch (event_act) {
        case 'add-member':
            return this.on_add_member(data_obj);
        case 'del-member':
            return this.on_del_member(data_obj);
        case 'dtmf':
            return this.on_dtmf(data_obj);
        case 'stop-talking':
            return this.on_stop_talking(data_obj);
        case 'start-talking':
            return this.on_start_talking(data_obj);
        case 'mute-member':
            return this.on_mute_member(data_obj);
        case 'unmute-member':
            return this.on_unmute_member(data_obj);
        case 'kick-member':
            return this.on_kick_member(data_obj);
        case 'dtmf-member':
            return this.on_dtmf_member(data_obj);
        case 'lock':
            return this.on_lock(data_obj);
        case 'unlock':
            return this.on_unlock(data_obj);
        case 'conference-create':
            return this.on_conference_create(data_obj);
        case 'conference-destroy':
            return this.on_conference_destroy(data_obj);
        case 'energy-level':
        case 'volume-level':
        case 'gain-level':
        case 'energy-level-member':
        case 'volume-in-member':
        case 'volume-out-member':
        case 'play-file':
        case 'play-file-member':
        case 'speak-text':
        case 'speak-text-member':
        case 'transfer':
        case 'bgdial-result':
        case 'floor-change':
            return this.on_default_process_func(event);
        default:
            return this.on_default_process_func(data_obj);
    }
};

//private
PttConferenceProxy.prototype.on_default_process_func = function (obj) {
    //console.log(obj);
};

PttConferenceProxy.prototype.on_add_member = function (obj) {
    console.log('User enter conference:', obj.caller_name, obj.conference_name);

    //TODO
    try {
        let command =
            'conference ' + obj.conference_name + ' mute ' + obj.member_id;
        this.esl.api(command, res => {
            console.log('mute member...');
        });
    } catch (e) {
        console.log(e);
    }
};

PttConferenceProxy.prototype.on_del_member = function (obj) {
    console.log('User leave conference:', obj.caller_name, obj.conference_name);

    //TODO
    for (let i = 0; i < this.ptt_status; ++i) {
        let st = this.ptt_status[i];
        if (st.conference_uuid === obj.conference_uuid
            && st.talker_uuid === obj.caller_uuid) {
            st.talker_uuid = '';
            st.talker_member_id = '';
        }
    }
};

PttConferenceProxy.prototype.on_conference_create = function (obj) {
    console.log('New conference:', obj.conference_name);
};

PttConferenceProxy.prototype.on_conference_destroy = function (obj) {
    console.log('Conference destroy:', obj.conference_name);
};

PttConferenceProxy.prototype.on_dtmf = function (obj) {
    console.log('Conference dtmf:', obj.caller_name, obj.conference_name);
};

PttConferenceProxy.prototype.on_stop_talking = function (obj) {
    console.log('Conference stop talking:', obj.caller_name, obj.conference_name, obj.energy);
};

PttConferenceProxy.prototype.on_start_talking = function (obj) {
    console.log('Conference start talking:', obj.caller_name, obj.conference_name, obj.energy);
};

PttConferenceProxy.prototype.on_mute_member = function (obj) {
    console.log('Conference mute member:', obj.caller_name, obj.conference_name);
};

PttConferenceProxy.prototype.on_unmute_member = function (obj) {
    console.log('Conference unmute member:', obj.caller_name, obj.conference_name);
};

PttConferenceProxy.prototype.on_kick_member = function (obj) {
    console.log('Conference kick member:', obj.caller_name, obj.conference_name);
};

PttConferenceProxy.prototype.on_dtmf_member = function (obj) {
    console.log('conference dtmf member:', obj.caller_name, obj.conference_name);
};

PttConferenceProxy.prototype.on_lock = function (obj) {
    console.log('Conference lock:', obj.conference_name);
};

PttConferenceProxy.prototype.on_unlock = function (obj) {
    console.log('Conference unlock:', obj.conference_name);
};