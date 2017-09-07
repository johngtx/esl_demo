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

module.exports = {
    Insert (data) {
        console.log('FsCdrModel Insert', data);
    },

    Delete (data) {
        console.log('FsCdrModel Delete', data);
    },

    Update (olddata, newdata) {

    },

    Search (filter) {
        console.log('FsCdrModel Search', data);
    },

    SearchAll () {
        console.log('FsCdrModel SearchAll', data);
    }
};