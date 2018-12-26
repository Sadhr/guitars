const mailer = require("nodemailer");
const { welcome } = require("./welcome_template");
const { purchase } = require("./purchase_template");
const { resetPass } = require("./resetpass_template");

require("dotenv").config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: "Guitars <guitars.waves@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome()
      };
      break;
    case "purchase":
      data = {
        from: "Guitars <guitars.waves@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData)
      };
      break;
    case "reset_password":
      data = {
        from: "Guitars <guitars.waves@gmail.com>",
        to,
        subject: `Hey ${name}, reset your password`,
        html: resetPass(actionData)
      };
      break;
    default:
      data;
  }

  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "guitars.waves@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
