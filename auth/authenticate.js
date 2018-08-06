var jwt = require("jsonwebtoken");
var helper = require('./../Helpers');
process.env.JwtSecretKey = helper.Constants.JwtSecretKey;

module.exports.authenticate= function (req, res, next){
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, process.env.JwtSecretKey, function (err, ress) {
            if (err) {
                res.status(500).send(helper.MSG_LIST.Invalid_Token);
            } else {
                req.decoded = ress;
                next();
            }
        })
    } else {
        res.send(helper.MSG_LIST.Invalid_Token);
    }
}