var express = require("express");
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var app = express();
var router = express.Router();
var main = require('./controllers/controller');
var helper = require('./Helpers');
var authenticate = require('./auth/authenticate');

process.env.jwtSecret = helper.Constants.JwtSecretKey;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.post('/token', main.Controller.Authenticate);
app.post('/register', main.Controller.RegisterUser);
app.get('/activate', main.Controller.Activate);
router.get('/profile', authenticate.authenticate, main.Controller.MyProfile);

var port =  3001
app.listen(port, function () {
    console.log('Api Server is running.. on Port: ' + port);
})
