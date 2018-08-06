var pg = require("pg");
var helper = require('./../Helpers');
var conString = helper.ConnectionString.server;
var client = new pg.Client(conString);
client.connect();
module.exports = client;

//-------------------IMALI--------------------------------------------------//