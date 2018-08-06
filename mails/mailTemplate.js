var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({service: "Gmail",
    auth: {
        user:"Support@uChange.cash",
        pass:"uchange@786"
    }
});

module.exports.sendMail = function (mailOptions,req,res) {
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
             res.end("Email sent successfully.");
        }
    });
}

