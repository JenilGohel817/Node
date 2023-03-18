const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // Connect With the SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "dannie.hoeger26@ethereal.email",
      pass: "9WWpRRrgU325fhyvnX",
    },
  });

  // Send Mail User
  let info = await transporter.sendMail({
    from: "Jenil Gohel",
    to: "Jenilgohel817@gmail.com",
    text: "Hello Jenil",
  });

  console.log("message sent: %s", info.messageId);
  res.send(info);
};

module.exports = sendMail;
