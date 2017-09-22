//fs mod_json_cdr 
const FsCdrModel = require('../model/fscdr_model');

//interface
module.exports = {
    ProcessFsCdrData (data) {
        FsCdrModel.Insert(translate_origin_cdr_data(data));
    },
    
    GetAllFsCdrData() {
        return FsCdrModel.SearchAll();
    }
}

//////////////////////////////////////////////////////////////////////////
function translate_origin_cdr_data(data) {
    try {
        let obj = JSON.parse(data);
        return {
            core_uuid: obj["core-uuid"],
            switchanme: obj["switchname"],
            caller_id_name: obj["callflow"][0]["caller_profile"]["caller_id_name"],
            caller_id_number: obj["callflow"][0]["caller_profile"]["caller_id_number"],
            destination_number: obj["callflow"][0]["caller_profile"]["destination_number"],
            context: obj["callflow"][0]["caller_profile"]["conext"],
            start_stamp: obj["variables"]["start_stamp"],
            answer_stamp: obj["variables"]["answer_stamp"],
            end_stamp: obj["variables"]["end_stamp"],
            duration: obj["variables"]["duration"],
            billsec: obj["variables"]["billsec"],
            hangup_cause: obj["variables"]["hangup_cause"],
            uuid: obj["variables"]["uuid"],
            bleg_uuid: '',
            account_code: obj["variables"]["accountcode"]
        }
    } catch (e) {
        console.log(e);
        return {};
    }
}