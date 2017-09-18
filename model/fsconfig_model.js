/*
 * Create XML configuration content
 */
const xml = require('xml');

module.exports = {
    GetDirectory (params) {
        return get_dierctory_xml_content1(params);
    },

    GetDialplan (params) {
        return get_dialplan_xml_content(params);
    }
}

//private
function get_dierctory_xml_content1(params) {
    if (!params.user.match('^134\\d{4}$')) {
        return '<document type="freeswitch/xml"><section name="directory"></section></document>';
    }

    let content = xml([{
        document: [{
            _attr: { type: 'freeswitch/xml' }
        }, {
            section: [{
                _attr: { name: 'directory'}
            }, {
                domain: [{ 
                    _attr: { value: params.domain } 
                }, {
                    params: [{
                        param: { _attr: {
                                name: 'dial-string',
                                value: '{presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(${dialed_user}@${dialed_domain})}'
                        }}
                    }]
                }, {
                    groups: [{
                        group: [{
                            _attr: { name: 'default' }
                        }, {
                            users: [{
                                user: [{
                                    _attr: { id: params.user }
                                }, {
                                    params: [{
                                        param: {_attr: { name: 'password', value: '17951' }}
                                    }]
                                // }, {
                                //     variables: [{
                                //         variable: {_attr: { name: 'toll_allow', value: 'domestic,international,local' }}
                                //     }, {
                                //         variable: {_attr: { name: 'accountcode', value: params.user }}
                                //     }, {
                                //         variable: {_attr: { name: 'user_context', value: 'default' }}
                                //     }, {
                                //         variable: {_attr: { name: 'effective_caller_id_name', value: params.user }}
                                //     }, {
                                //         variable: {_attr: { name: 'effective_caller_id_number', value: params.user }}
                                //     }, {
                                //         variable: {_attr: { name: 'outbound_caller_id_name', value: '$${outbound_caller_name}' }}
                                //     }, {
                                //         variable: {_attr: { name: 'outbound_caller_id_number', value: '$${outbound_caller_id}' }}
                                //     }]
                                // }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]);

    return content;
}

function get_dialplan_xml_content(params) {
    return '';
}

function get_dierctory_xml_content2(params) {
    let content = xml([{
        document: [{
            _attr: { type: 'freeswitch/xml' }
        }, {
            section: [{
                _attr: { name: 'directory'}
            }, {
                domain: [{ 
                    _attr: { value: params.domain } 
                },{
                    user: [{
                        _attr: { id: params.user }
                    }, {
                        params: [{
                            param: {_attr: { name: 'password', value: '1010' }},
                        }, {
                            param: {_attr: { name: 'vm-password', value: '1010' }},
                        }, {
                            param: {_attr: { name: 'dial-string', value: "{sip_invite_domain=${dialed_domain},presence_id=${dialed_user}@${dialed_domain}}${sofia_contact(${dialed_user}@${dialed_domain})}"}}
                        }]
                    }]
                }]
            }]
        }]
    }]);

    return content;
}