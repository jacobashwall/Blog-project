//nodejs setup
const path = require('path');
const fs = require('fs');
const axios = require('axios');
//express setup
const express = require("express");
const app = express();
//database setup - mongodb
const mongoose = require("mongoose");
const User = require("./models/Usermodel")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Ashwalls:209783349@cluster0.6ro0qol.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("React-application").collection("Users");
//email setup - nodemail, sjcl, handlebars
const sjcl = require('sjcl');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: "reactappjs@zohomail.com",
    pass: "nZP*JL2@x2Ghr9W"
  },
  
  tls: {
    rejectUnauthorized: false
  },
});
const handlebars = require("handlebars");

//server setup- connect to db and to port
client.connect(err => {
  app.listen(5000, () => { console.log("server connected to mongodb atlas database and running on port 5000") })
});
//helps with cross origin, change the headers of the html fiel returning from server (CORS)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});
// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');
// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));
//check server connection status
app.get("/api", (req, res) => {
  res.json({ "users": ["server is connected"] })
})

app.post("/new-user", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    doMail: req.body.doMail,
    birthDate: req.body.birthDate
  });
  collection.insertOne(newUser);
})

app.post("/new-user-username-check", (req, res) => {
  collection.findOne({ username: req.body.username }, (err, doc) => {
    if (doc) {
      res.send("true")
    }
    else {
      res.send("false")
    }
  }
  );
})

app.post("/new-user-email-check", (req, res) => {
  collection.findOne({ email: req.body.email }, (err, doc) => {
    if (doc) {
      res.send("true")
    }
    else {
      res.send("false")
    }
  }
  );
})

app.post("/email-verification-send-code", (req, res) => {
  const filePath = path.join(__dirname, './emails/registerEmail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const registerEmailTamplate = handlebars.compile(source);
  const string = req.body.username + req.body.email;
  const bitArray = sjcl.hash.sha256.hash(string);
  const code = sjcl.codec.hex.fromBits(bitArray).slice(0, 5);
  const replacements = {
    username: req.body.username,
    code: code
  };
  const htmlToSend = registerEmailTamplate(replacements);
  const verifyAccount = {
    from: "Site Name <reactappjs@zohomail.com>",
    to: req.body.email,
    subject: "Verify Your Email Address!",
    html: htmlToSend,
  }
  transporter.sendMail(verifyAccount, (err, info) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(info.response);
  })
}
)

app.post("/email-verification-check-code", (req, res) => {
  const string = req.body.username + req.body.email;
  const bitArray = sjcl.hash.sha256.hash(string);
  const code = sjcl.codec.hex.fromBits(bitArray).slice(0, 5);
  if (req.body.code === code)
    res.send("true");
  else
    res.send("false");
})

app.post("/login-check", (req, res) => {
  collection.findOne({ username: req.body.username }, (err, doc) => {
    if (doc) {
      if (doc.password == req.body.password) {
        res.send("true")
      }
      else {
        res.send("incorrect password")
      }
    }
    else {
      res.send("username not found")
    }
  }
  );
})

app.post("/forgot-password-email-check", (req, res) => {
  collection.findOne({ email: req.body.email }, (err, doc) => {
    if (doc) {
      res.send(doc.username)
    }
    else {
      res.send("false")
    }
  }
  );
})

app.post("/forgot-password-send-code", (req, res) => {
  collection.findOne({ email: req.body.email }, (err, doc) => {
    const filePath = path.join(__dirname, './emails/forgotPassword.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const forgotPasswordTamplate = handlebars.compile(source);
    const string = doc.username + doc.email + doc.password;
    const bitArray = sjcl.hash.sha256.hash(string);
    const code = sjcl.codec.hex.fromBits(bitArray).slice(0, 8);
    const replacements = {
      username: doc.username,
      code: code
    };
    const htmlToSend = forgotPasswordTamplate(replacements);
    const verifyAccount = {
      from: "Site Name <reactappjs@zohomail.com>",
      to: req.body.email,
      subject: "Restart password!",
      html: htmlToSend,
    }
    transporter.sendMail(verifyAccount, (err, info) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send(info.response);
    })
  })
}
)

app.post("/forgot-password-check-code", (req, res) => {
  collection.findOne({ email: req.body.email }, (err, doc) => {
    const string = doc.username + doc.email + doc.password;
    const bitArray = sjcl.hash.sha256.hash(string);
    const code = sjcl.codec.hex.fromBits(bitArray).slice(0, 8);
    if (req.body.code === code)
      res.send("true");
    else
      res.send("false");
  })
})

app.post("/forgot-password-change-password", (req, res) => {
  collection.findOneAndUpdate({ email: req.body.email }, { $set: { password: req.body.password } })
})

