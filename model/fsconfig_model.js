/*
 * Create XML configuration content
 */
const xml = require('xml');

module.exports = {
    GetDirectory (params) {
        return get_dierctory_xml_content(params);
    },

    GetDialplan (params) {
        return get_dialplan_xml_content(params);
    }
}

//private
function get_dierctory_xml_content(params) {
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
                                    _attr: { id: params.sip_auth_username }
                                }, {
                                    params: [{
                                        param: { _attr: {
                                            name: 'password',
                                            value: '1010'
                                        }}
                                    }]
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