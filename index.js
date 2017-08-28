let esl = require('modesl');

let conn = esl.Connection('39.108.134.243', 8021, 'fs', () => {
    conn.api('version', res => {
        console.log(res.getBody());
    });
});