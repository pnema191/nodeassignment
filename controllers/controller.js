var database = require('./../db/database');
var connection = require('./../config/main-config');

var url = require('url');
var helper = require('../Helpers');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.Controller = {

    Authenticate: function (req, res) {
        var authOptions = {
            email: req.body.email,
            password: req.body.password
        }
        database.dbEngine.Authenticate(authOptions, function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: helper.MSG_LIST.Error_Query + error
                });

            } else {
                if (results.rows.length > 0) {
                    bcrypt.compare(authOptions.password, results.rows[0].password, function (err, ress) {
                        if (!ress) {
                            res.json({
                                status: false,
                                message: helper.MSG_LIST.Email_Not_Match
                            });

                        } else {

                            var token = jwt.sign(results.rows[0], helper.Constants.JwtSecretKey, {
                                //expiresIn: helper.Constants.ExpirationTime + 'h'
                            });
                            res.json({
                                status: true,
                                token: token,
                                message: helper.MSG_LIST.Token_Expiration_Time//'Token will expired time in 2 hours!!'
                            })
                        }
                    });
                }
                else {
                    res.json({
                        status: false,
                        message: helper.MSG_LIST.Email_Not_Exist //"Email does not exits"
                    });
                }
            }
        });
    },
    RegisterUser: function (req, res) {

        if (req.body.Name && req.body.Address && req.body.email && req.body.password) {
            var hostname = req.headers.host; // hostname = 'localhost:8080'
            var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
            var users = {
                "name": req.body.Name,
                "address": req.body.Address,
                "contact": req.body.Contact,
                "email": req.body.email,
                "password": req.body.password,
                "url": 'http://' + hostname + '/activate',
            }

            database.dbEngine.RegisterUser(users, function (status, message, data) {
                helper.CreateResponse(status, message, data, function (response) {
                    res.send(response);
                });
            });
        }
        else {
            status = 'false';
            message = helper.MSG_LIST.Send_All_Required_Data
            helper.CreateResponse(status, message, null, function (response) {
                delete response.result
                res.send(response)
            })
        }
    },
    MyProfile: function (req, res) {
        var email = req.decoded.email;
        database.dbEngine.MyProfile(email, function (status, message, data) {
            helper.CreateResponse(status, message, data, function (response) {
                res.send(response);
            });
        });
    },
    Activate: function (req, res) {
        database.dbEngine.Activate(id, function (status, message, data) {
            helper.CreateResponse(status, message, data, function (response) {
                res.send("ok");
            });
        });
    }
}