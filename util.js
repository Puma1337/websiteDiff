const moment = require("moment");


exports.timeout = function timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};

exports.log = function log(data){
    console.log(moment().format() + ": " + data);
}