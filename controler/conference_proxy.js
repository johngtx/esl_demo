/**
 * Created by john on 8/28/17.
 */
const NoticeApi = require('../interface/event_notification_api');

let ConferenceProxy = module.exports = function () {

};

ConferenceProxy.prototype.Init = function (esl) {
    console.log('11111111');
    this.esl_ = esl;
    console.log(typeof(this.esl_));
};

ConferenceProxy.prototype.GetConfList = function (pfunc) {
    let self = this;

    if (typeof(pfunc) === 'function') {
        try {
            console.log(typeof(self.esl_));
            console.log(typeof(this.esl_));
            self.esl_.api("conference json_list", res => {
                let data = JSON.parse(res.getBody());
                let list = [];
                for (let i = 0; i < data.length; ++i) {
                    let conf = data[i];
                    if (conf.conference_name.match('^90\\d{4}$')) {
                        list.push(conf);
                    }
                }
                pfunc(list);
            });
        } catch (e) {
            console.log(e);
            pfunc([]);
        }
    } else {
        console.log('222', typeof(pfunc));
        pfunc([]);
    }
};

//process freeswitch event
ConferenceProxy.prototype.ProcessEvent = function (event) {
    let event_act = event.getHeader('Action');
    let data_obj = _GetConferenceMaintenanceHeader(event);

    //TODO
    NoticeApi.SendNotice({
        type:       'conference',
        sub_type:   event_act,
        msg:        'ok',
        code:       '200',
        data: data_obj
    });

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

//process request
ConferenceProxy.prototype.ProcessRequest = function (data) {
    //TODO
};

//private
ConferenceProxy.prototype.on_default_process_func = function (obj) {
    //console.log(obj);
};

ConferenceProxy.prototype.on_add_member = function (obj) {
    console.log('User enter conference:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_del_member = function (obj) {
    console.log('User leave conference:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_conference_create = function (obj) {
    console.log('New conference:', obj.conference_name);

    //TODO
    NoticeApi.SendNotice({
        type:       'conference',
        sub_type:   'conference-create',
        msg:        'ok',
        code:       '200',
        data: obj
    });
};

ConferenceProxy.prototype.on_conference_destroy = function (obj) {
    console.log('Conference destroy:', obj.conference_name);

    //TODO
    NoticeApi.SendNotice({
        type:       'conference',
        sub_type:   'conference-destroy',
        msg:        'ok',
        code:       '200',
        data: obj
    });
};

ConferenceProxy.prototype.on_dtmf = function (obj) {
    console.log('Conference dtmf:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_stop_talking = function (obj) {
    console.log('Conference stop talking:', obj.caller_name, obj.conference_name, obj.energy);
};

ConferenceProxy.prototype.on_start_talking = function (obj) {
    console.log('Conference start talking:', obj.caller_name, obj.conference_name, obj.energy);
};

ConferenceProxy.prototype.on_mute_member = function (obj) {
    console.log('Conference mute member:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_unmute_member = function (obj) {
    console.log('Conference unmute member:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_kick_member = function (obj) {
    console.log('Conference kick member:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_dtmf_member = function (obj) {
    console.log('conference dtmf member:', obj.caller_name, obj.conference_name);
};

ConferenceProxy.prototype.on_lock = function (obj) {
    console.log('Conference lock:', obj.conference_name);
};

ConferenceProxy.prototype.on_unlock = function (obj) {
    console.log('Conference unlock:', obj.conference_name);
};
