//fs mod_json_cdr 
const FsCdrModel = require('../model/fscdr_model');

module.exports = {
    ProcessFsCdrData (data) {
        FsCdrModel.Insert(translate_origin_cdr_data(data));
    },
    
    GetAllFsCdrData() {
        return FsCdrModel.SearchAll();
    }
}

function translate_origin_cdr_data(data) {
    return {
        core_uuid: data["core-uuid"],
        switchanme: data["switchname"],
        caller_id_name: data["callflow"][0]["caller_profile"]["caller_id_name"],
        caller_id_number: data["callflow"][0]["caller_profile"]["caller_id_number"],
        destination_number: data["callflow"][0]["caller_profile"]["destination_number"],
        context: data["callflow"][0]["caller_profile"]["conext"],
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