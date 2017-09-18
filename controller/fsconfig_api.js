const FsConfigModel = require('../model/fsconfig_model');

//interface
module.exports = {
    GetFsDirectory (params) {
        return FsConfigModel.GetDirectory(params);
    },

    GetFsDialplan (params) {
        return FsConfigModel.GetDialplan(params);
    },

    GetFsConfiguration (params) {
        return FsConfigModel.GetConfiguration(params);
    },

    GetNotFound (params) {
        return FsConfigModel.XMLNotFound(params);
    }
}