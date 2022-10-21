const express = require("express");
const checksumLib = require("./Paytm/checksum/checksum");
var path = require('path');

const app = express();
var nodemailer = require('nodemailer');

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/pay", [parseUrl, parseJson], (req, res) => {
  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.firstname,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
  };
  let params = {};
  params["MID"] = "jDmsGs17261719390925";
  params["WEBSITE"] = "WEBSTAGING";
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = "ORD" + new Date().getTime();
  params["CUST_ID"] = paymentDetails.customerId;
  params["CALLBACK_URL"] = "http://localhost:3000/callback";
  params["MOBILE_NO"] = paymentDetails.customerPhone;
  params["EMAIL"] = paymentDetails.customerEmail;
  params["TXN_AMOUNT"] = paymentDetails.amount;

  checksumLib.genchecksum(params, "i_4#FtwD0@lDrD8j", (err, checksum) => {
    let url = "https://securegw-stage.paytm.in/order/process";
    let formFields = "";
    for (x in params) {
      formFields +=
        "<input type = 'hidden' name = '" +
        x +
        "' value = '" +
        params[x] +
        "'/>";
    }
    formFields +=
      "<input type = 'hidden' name = 'CHECKSUMHASH' value = '" +
      checksum +
      "'>";

    var html =
      '<html><body><center>Please do not refresh this page...</center><form method = "post" action = "' +
      url +
      '" name = "paymentForm">' +
      formFields +
      '</form><script type = "text/javascript">document.paymentForm.submit()</script></body></html>';
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });

  "use strict";
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'sppspps666@gmail.com', // sender address
      to: paymentDetails.customerEmail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
  
});


app.post("/callback", (req, res) => {

  res.sendFile(path.join(__dirname + '/index1.html'));

});





     

app.listen(3000, () => console.log("App is running at port 3000..."));


