/**
 * Created by john on 8/29/17.
 */
module.exports = function (config) {
    let application_ = {};

    global._GetApplication = () => { return application_; };
    global._InitApplication = app => { application_ = Object.assign(app); }

    global._GetDTMFHeader = get_dtmf_header;
    global._GetConferenceMaintenanceHeader = get_conference_maintenance_header;
    global._GenerateUUID = generate_uuid;
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
        action: event.getHeader('Action'),
        conference_name: event.getHeader('Conference-Name'),
        conference_uuid: event.getHeader('Conference-Unique-ID'),
        answer_state: event.getHeader('Answer-State'),
        caller_uuid: event.getHeader('Caller-Unique-ID'),
        caller_name: event.getHeader('Caller-Caller-ID-Name'),
        caller_number: event.getHeader('Caller-Caller-ID-Number'),
        caller_addr: event.getHeader('Caller-Network-Addr'),
        caller_dst_num: event.getHeader('Caller-Destination-Number'),
        member_id: event.getHeader('Member-ID'),
        member_type: event.getHeader('Member-Type'),
        energy: event.getHeader('Current-Energy')
    };
}

function generate_uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c =='x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
};