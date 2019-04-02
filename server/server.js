//BACK_END

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Formidable = require('formidable');
const path = require('path');
const crypto = require('crypto');

//MongoDB
//const PicModel = require('./pic_schema')

const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/myproj';
//mongoose.connect('mongodb://127.0.0.1:27017/myproj');
//const conn = mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.on('connected', function () {
  console.log('connected');
})

//Model
var ScheMa = mongoose.Schema;
var ImgSchema = new ScheMa({
  name: String
})

var pic = mongoose.model('pic', ImgSchema);

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const uploadDir = 'images';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images/');
  },
  filename: function(req, file, cb) {

    var namee = file.originalname;

    var newImg = pic({
      name: namee
    });

    newImg.save(function(err) {
      if (err) throw err;

      console.log("namecome")
    })
    // ImageModel.create({ name: file.originalname}, function(err) {
    //   if (err) return console.log("error");
    // })

    console.log(file.originalname)

    cb(null, file.originalname);
  }
})
const uploadF = multer({storage: storage}).single('photo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('pic');
// })

// Setting up the root route
app.get('/', (req, res) => {
    res.end('Welcome to the express server');
});

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin' , 'http://localhost:3000');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     res.append('Access-Control-Allow-Credentials', true);
//     next();
// })

app.post('/addpic', function (req,res) {
  var pathed = '';
  uploadF(req, res, function(err) {

    // res.json(name: file.originalname);

    // if(err){
    //   console.log(err);
    //   return res.status(422).send("an Error occured");
    // }

    // pathed = req.file.path;

    // return res.send("Upload Complete:"+pathed);
  })
  // res.status(200).json({
  //   message: 'It worked '+pathed,
  // });
})

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Server is running.. at port: %s", port);
})
