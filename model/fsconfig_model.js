/*
 * Create XML configuration content
 */
const xml = require('xml');
const fs = require('fs');

/* 
 * Interface
 */
module.exports = {
    GetDirectory (params) {
        return get_directory_xml_content(params);
    },

    GetDialplan (params) {
        return get_dialplan_xml_content(params);
    },

    GetConfiguration (params) {
        return get_configuration_xml_content(params);
    },

    XMLNotFound (params) {
        return not_found_xml_content(params);
    }
}

//////////////////////////////////////////////////////////////////////////
/*
 * Not Found
 */
function not_found_xml_content(params) {
    let tpl = fs.readFileSync('./static/freeswitch/not_found.xml').toString('utf-8');
    let data = {
        //TODO
    };

    return parse_xml_template(tpl, data);
}

/*
 * Directory 
 * Path static/freeswitch/directory/default.xml
 */
function get_directory_xml_content(params) {
    let data = {
        id: params.user || '1000',
        password: '1234',
        vmpassword: '1234',
        accountcode: params.user || '1000',
        context: 'default',
        name: params.user || '1000',
        number: params.user || '1000',
        callgroup: 'default'
    };

    if (data.id.match(/^134[0-9]{4}$/) === null) {
        return not_found_xml_content(params);
    }

    let tpl = fs.readFileSync('./static/freeswitch/directory/default.xml').toString('utf-8');

    return parse_xml_template(tpl, data);
}

/*
 * Dialplan
 * Path static/freeswitch/directory/default.xml
 * Path static/freeswitch/directory/public.xml
 */
function get_dialplan_xml_content(params) {
    let context = params['Caller-Context'];

    if (context === '' || !context) return not_found_xml_content(params);

    let path = './static/freeswitch/dialplan/' + context + '.xml'
    let tpl = fs.readFileSync(path).toString('utf-8');

    let data = {
        //TODO
    };

    return parse_xml_template(tpl, data);
}

/*
 * Condiguration
 * Path static/freeswitch/auto_configs
 */
function get_configuration_xml_content(params) {
    let section = params['section'];
    let key = params['key_value'];
    let profile = params['profile'];
    let path = './static/freeswitch/autoload_configs/' + key + '.xml';
    let tpl = fs.readFileSync(path).toString('utf-8');
    let data = {};

    if (key === 'sofia.conf' && profile != '') {
        let ext_tpl = fs.readFileSync('./static/freeswitch/sip_profiles/external.xml').toString('utf-8');
        let int_tpl = fs.readFileSync('./static/freeswitch/sip_profiles/internal.xml').toString('utf-8');
        data["profile"] = parse_xml_template(ext_tpl, {}) + parse_xml_template(int_tpl, {});

        let content = 
        '<document type="freeswitch/xml"><section name="configuration">' +
        '<configuration>' +
        '<global_settings>' +
        '<param name="log-level" value="0"/>' +
        '<param name="debug-presence" value="0"/>' +
        '</global_settings>' +
        '<profiles>' +
        ext_tpl + int_tpl +
        '</profiles>' +
        '</configuration>' +
        '</section></document>';

        return content;
    }

    let content = 
        '<document type="freeswitch/xml"><section name="configuration">' +
        parse_xml_template(tpl, data) +
        '</section></document>';

    return content;
}

/*
 * Parse XML template
 * @param tpl template content
 * @param params input args
 * @return xml content
 */
function parse_xml_template(tpl, data) {
    let matches = tpl.match(/%%([a-zA-Z_]\w+)%%/g);

    if (matches === null) return tpl;

    let content = Object.assign(tpl);
    for (let i = 0; i < matches.length; ++i) {
        let match = matches[i];
        let arg_name = match.substring(2, match.length - 2);

        content = content.replace(match, data[arg_name]);
    }

    return content;
}