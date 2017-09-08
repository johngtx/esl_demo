const FsConfigModel = require('../model/fsconfig_model');

module.exports = {
    GetFsDirectory (params) {
        return FsConfigModel.GetDirectory(params);
    },

    GetFsDialplan (params) {
        return FsConfigModel.GetDialplan(params);
    }
}