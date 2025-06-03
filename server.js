require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const port = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { fullname, email, password } = req.body;

  // Get current time in GMT+8 (Asia/Hong_Kong)
const moment = require("moment-timezone");
const timestamp = moment().tz("Asia/Hong_Kong").format("YYYY-MM-DD HH:mm:ss");

  const msg = {
    to: "janaliado6@gmail.com",            // Your receiving email
    from: "	joel@twiliotelustraining.com",  // Your verified sender email
    subject: "New User Sign-up",
    text: `
      A new user has signed up:

      Full Name: ${fullname}
      Email: ${email}
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.json({ message: "Sign-up successful! Email sent." });
    })
    .catch((error) => {
      console.error("SendGrid error:", error);
      res.status(500).json({ message: "Failed to send email." });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
