const sgMail = require("@sendgrid/mail");
const {
  welcomeMailTemplate,
} = require("../emailTemplates/welcomeMailTemplate");
require("dotenv/config");

const welcomeMail = (mail) => {
  sgMail.setApiKey(process.env.Mail_Secret);
  const content = welcomeMailTemplate();
  const msg = {
    to: mail,
    from: "vishnusatheeshdev@gmail.com",
    subject: "Thanks for create an account",
    html: content,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { welcomeMail };
