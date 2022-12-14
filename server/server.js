//nodejs setup
const path = require('path');
const fs = require('fs');
//express setup
const express = require("express");
const app = express();
app.listen(5000, () => { console.log("server is running on port 5000") })
//database setup - mongoose, multer
const mongoose = require("mongoose");
const User = require("./models/Usermodel")
const Blog = require("./models/Blogmodel")
const Image = require('./models/Imagemodel');
const uri = "mongodb+srv://Ashwalls:209783349@cluster0.6ro0qol.mongodb.net/Blog-Project-DB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  console.log('connected to mongodb')
});
const multer = require('multer');
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: Storage });
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
const { updateOne } = require('./models/Usermodel');
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

/*
const newUser = new User({
  username: "1",
  password: "1",
  email:"1",
  doMail:true,
  birthDate: "2022",
  readLater: []
});
newUser.save();
*/

app.post("/new-user", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    doMail: req.body.doMail,
    birthDate: req.body.birthDate,
    readLater: []
  });
  newUser.save();
  res.send("new user added")
})

app.post("/new-user-username-check", (req, res) => {
  User.findOne({ username: req.body.username }, (err, doc) => {
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
  User.findOne({ email: req.body.email }, (err, doc) => {
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
  User.findOne({ username: req.body.username }, (err, doc) => {
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
  User.findOne({ email: req.body.email }, (err, doc) => {
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
  User.findOne({ email: req.body.email }, (err, doc) => {
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
  User.findOne({ email: req.body.email }, (err, doc) => {
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
  User.updateOne({ email: req.body.email },
    { password: req.body.password }, function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated Docs : ", docs);
      }
    });
})

app.post('/upload', upload.single("image"), (req, res) => {
  const saveImage = new Image({
    name: req.body.name,
    img: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: "image/png"
    },
    desc: req.body.description,
    uploader: req.body.uploader
  });
  saveImage.save().then((r) => res.send("image is saved")).catch((err) => console.log(err));

})

app.get('/get-all-images', async (req, res) => {
  const allData = await Image.find();
  res.json(allData);
})

app.post("/get-images-by-user", async (req, res) => {
  const allData = await Image.find({ uploader: req.body.username });
  res.json(allData);
})

app.post("/get-blogs-by-user", async (req, res) => {
  const allData = await Blog.find({ author: req.body.username });
  res.json(allData);
})

app.post("/get-blogs-by-tag", async (req, res) => {
  const allData = await Blog.find({ tags: req.body.tag });
  res.json(allData);
})

app.post("/get-images-by-id", async (req, res) => {
  try {
    const allData = await Image.findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
    if (allData)
      res.json(allData);
    else
      res.send(null)
  }
  catch {
    res.send(null)
  }
})

app.post("/exist-images-by-id", async (req, res) => {
  try {
    const allData = await Image.exists({ _id: new mongoose.Types.ObjectId(req.body.id) });
    console.log(allData)
    if (allData)
      res.send(allData);
    else
      res.send(null)
  }
  catch {
    res.send(null)
  }
})

app.post("/get-blog-by-id", async (req, res) => {
  const allData = await Blog.findOne({ _id: new mongoose.Types.ObjectId(req.body.id) });
  res.json(allData);

})

app.post("/edit-blog-by-id", async (req, res) => {
  let updatedBlog = req.body.updatedBlog;
  Blog.findByIdAndUpdate(req.body.id,
    {
      $set: {
        header: updatedBlog.header,
        subheader: updatedBlog.subheader,
        date: Date.now(),
        tags: updatedBlog.tags,
        body: updatedBlog.body
      }
    },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
  res.send("Sent")
})

app.post("/new-blog", (req, res) => {
  const newBlog = new Blog({
    header: "New blog",
    subheader: "A fresh new blog for you!",
    author: req.body.username,
    date: Date.now(),
    tags: [req.body.username,],
    body: [{
      title: "Title",
      imageId: "Image ID",
      description: "Image Description",
      text: "Text"
    }],
    likes: 0,
    dislikes: 0,
    comments: []
  });
  newBlog.save();
  res.send(newBlog);
})


app.post("/add-read-later-by-username", (req, res) => {
  if (req.body.isChecked == true) {
    User.findOneAndUpdate({ username: req.body.username }, { $push: { readLater: req.body.blogId } },
      (err, result) => {
        if (err)
          res.send(err)
        else{
          console.log("Added")
          res.send(result)
        }
      })
  }
  else {
    User.findOneAndUpdate({ username: req.body.username }, { $pull: { readLater: req.body.blogId } },
      (err, result) => {
        if (err)
          res.send(err)
        else{
          console.log("removed")
          res.send(result)
        }
      })
  }
})

app.post("/get-read-later-by-username", async (req, res) => {
  const user = await User.findOne({ username: req.body.username})
  console.log(user.readLater)
  res.send(user.readLater)
})