let FsCdrModel = module.exports = Object.create();

/*
 *  data {
 *      core_uuid           string
 *      switchname          string
 *      caller_id_name      string
 *      caller_id_number    string
 *      destination_number  string
 *      context             string
 *      start_stamp         datetime
 *      answer_stamp        datetime
 *      end_stamp           datetime
 *      duration            integer
 *      billsec             integer
 *      hangup_cause        string
 *      uuid                string
 *      bleg_uuid           string
 *      account_code        string
 *  }
 */

FsCdrModel.Insert = function (data){
    console.log('FsCdrModel Insert', data);
}

FsCdrModel.Delete = function (data){
    console.log('FsCdrModel Delete', data);
}

FsCdrModel.Update = function (olddata, newdata){
}

FsCdrModel.Search = function (filter){
    console.log('FsCdrModel Search', data);
}

FsCdrModel.SearchAll = function () {
    console.log('FsCdrModel SearchAll', data);
}