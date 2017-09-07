//fs mod_json_cdr 
const FsCdrModel = require('../model/fscdr_model');

module.exports = {
    ProcessFsCdrData: function process_fscdr_data(data) {
        FsCdrModel.Insert(translate_origin_cdr_data(data));
    },

    GetAllFsCdrData: function get_all_fscdr_data() {
        return FsCdrModel.SearchAll();
    }
}

function translate_origin_cdr_data(data) {
    return {
        core_uuid: data["core-uuid"],
        switchanme: data["switchname"],
        caller_id_name: data["callflow"]["caller_rofile"]["caller_id_name"],
        caller_id_number: data["callflow"]["caller_rofile"]["caller_id_number"],
        destination_number: data["callflow"]["caller_rofile"]["destination_number"],
        context: data["callflow"]["caller_rofile"]["conext"],
        start_stamp: data["variables"]["start_stamp"],
        answer_stamp: data["variables"]["answer_stamp"],
        end_stamp: data["variables"]["end_stamp"],
        duration: data["variables"]["duration"],
        billsec: data["variables"]["billsec"],
        hangup_cause: data["variables"]["hangup_cause"],
        uuid: data["variables"]["uuid"],
        bleg_uuid: '',
        account_code: data["variables"]["accountcode"]
    }
}