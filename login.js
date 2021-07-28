var fs = require('fs');

var userdbPath = './database/admin.json';

exports.loginfind = function(callback) {
    fs.readFile(userdbPath, 'utf8', function(err,data) {
        if (err) { 
            return callback(err);
        }
        callback(null,JSON.parse(data).login);
    })
}

// exports.alert = function() {
//     document.getElementById("alert").innerHTML = '用户名或密码错误'
// }
