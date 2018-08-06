var connection = require('./../config/main-config');
var mail = require('./../mails/mailTemplate');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var helper = require('../Helpers');


exports.dbEngine = {
    Authenticate: function (authOptions, callback) {
        connection.query(helper.SQL_QUERY.Authenticate, [authOptions.email], function (error, results, fields) {
            callback(error, results, fields);
        });
    },
    MyProfile: function (email, callback) {
        var status = false, message = '', data = {};
        connection.query(helper.SQL_QUERY.MyProfile, [email], function (error, results) {
            if (error) {
                message = helper.MSG_LIST.SomethingWentWrong + ': ' + error
            } else {
                if (results.rows.length > 0) {
                    results.rows[0].password = undefined;
                    status = true;
                    data = results.rows;
                }
                else {
                    message = helper.MSG_LIST.Email_Not_Exist;
                }
            }
            callback(status, message, data);
        });
    },
    RegisterUser: function (users, callback) {
        var status = false, message = '', data = {};
        var today = new Date();
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(users.password, salt);
        connection.query(helper.SQL_QUERY.Register_User_Insert, [users.email, hash, users.name, users.address, today, 0, '0'], function (error, result) {
            if (error) {
                message = helper.MSG_LIST.SomethingWentWrong + error;
            } else {
                var activateLink = users.url + '/' + result.rows[0].id;
                var mailOptions = {
                    to: result.rows[0].email,
                    subject: "Congratulation! Thanks for creating your account",
                    html: "Hello " + users.name + ",<br><br>Congratulation!!. Thanks for creating an account. You have successfully registered.<br> Please click here to activate account: " + activateLink + "<br> <br> Regards,<br> TFT BHOPAL TEAM"
                }
                mail.sendMail(mailOptions);
                status = true;
                data = result.rows;
                message = 'user registered sucessfully - UserId : ' + result.rows[0].id;
            }
            callback(status, message, data);
        });
    },
    Activate: function (id, callback) {
        connection.query(helper.SQL_QUERY.UpdateUser, [id], function (error, results, fields) {
            callback(error, results, fields);
        });
    }
}


