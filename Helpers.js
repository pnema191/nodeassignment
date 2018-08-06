exports.Constants = {
    JwtSecretKey: "&tftBhopal$891=!41#0",
    ExpirationTime: '3'
}

exports.ConnectionString = {
    server: "postgres://postgres:Tftus@123@127.0.0.1:3668/tftassignmentdb"
}

exports.MSG_LIST = {
    Token_Expiration_Time: "Token will expire in " + exports.Constants.ExpirationTime + " hours.",
    Email_Not_Match: "Email or password incorrect",
    Email_Not_Exist: "Email does not exits",
    Error_Query: "there are some error with query",
    Invalid_Token: "Invalid Token",
    SomethingWentWrong: "Something went wrong."
}

exports.SQL_QUERY = {
    Authenticate: "SELECT * FROM users where email = $1",
    Register_User_Insert: "INSERT INTO users(email, password, name, address, created_on, createdby, isactive) VALUES($1, $2, $3,$4,$5,$6,$7) RETURNING email,id",
    MyProfile: "SELECT * FROM users where email = $1",
    UpdateUser: "Update users SET isactive = 1 where id= $1",
}

exports.ResponseObject = {
    status: true,
    message: "",
    result: {}
}

exports.CreateResponse = function (status, message, data, callback) {
    var responseObject = JSON.parse(JSON.stringify(exports.ResponseObject));
    responseObject.status = status;
    responseObject.message = message;
    responseObject.result = data;
    callback(responseObject);
}