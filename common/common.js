/**
 * Created by john on 8/29/17.
 */
const ConferenceProxy = require('../controler/conference_proxy');
const PttConferenceProxy = require('../controler/ptt_conference_proxy');

module.exports = function (config) {
    let conf_proxy = new ConferenceProxy();
    let ptt_proxy = new PttConferenceProxy();
    let config_ = {
        enable_ws: true,
        enable_mqtt: false
    };

    global._GetDTMFHeader = get_dtmf_header;
    global._GetConferenceMaintenanceHeader
        = get_conference_maintenance_header;
    global._ControlerFactory = {
        GetConferenceProxy: () => { return conf_proxy; },
        GetPttConferenceProxy: () => { return ptt_proxy; }
    };
    global._GetConfiguration = () => { return config_; };
};

function get_dtmf_header(event) {
    return {
        event_name: event.getHeader('Event-Name'),
        core_uuid: event.getHeader('Core-UUID'),
        unique_id: event.getHeader('Unique-ID'),
        channel_presence_id: event.getHeader('Channel-Presence-ID'),
        channel_call_uuid: event.getHeader('Channel-Call-UUID'),
        channel_state: event.getHeader('Channel-State'),
        caller_username: event.getHeader('Caller-Username'),
        caller_id_name: event.getHeader('Caller-Caller-ID-Name'),
        caller_id_number: event.getHeader('Caller-Caller-ID-Number'),
        caller_network_addr: event.getHeader('Caller-Network-Addr'),
        caller_dest_number: event.getHeader('Caller-Destination-Number'),
        caller_uuid: event.getHeader('Caller-Unique-ID'),
        dtmf_digit: event.getHeader('DTMF-Digit'),
        dtmf_duration: event.getHeader('DTMF-Duration'),
        dtmf_source: event.getHeader('DTMF-Source')
    };
}

function get_conference_maintenance_header(event) {
    return {
        conference_name: event.getHeader('Conference-Name'),
        conference_uuid: event.getHeader('Conference-Unique-ID'),
        answer_state: event.getHeader('Answer-State'),
        caller_name: event.getHeader('Caller-Caller-ID-Name'),
        caller_number: event.getHeader('Caller-Caller-ID-Number'),
        caller_addr: event.getHeader('Caller-Network-Addr'),
        caller_dst_num: event.getHeader('Caller-Destination-Number'),
        member_id: event.getHeader('Member-ID'),
        member_type: event.getHeader('Member-Type'),
        energy: event.getHeader('Current-Energy')
    };
}