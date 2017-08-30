/**
 * Created by john on 8/30/17.
 */
const WSInstance = require('./ws_server');

const EventNotificationApi = module.exports = {
    SendNotice: data => {
        if (_GetConfiguration().enable_ws) {
            WSInstance.SendNotification(data);
        }
    }
};