/**
 * Created by john on 8/30/17.
 */
module.exports = {
    SendNotice (data) {
        if (_GetApplication().Configuration.enable_ws) {
            _GetApplication().WSServerInstance.SendNotification(data);
        }
    }
};