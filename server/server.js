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

//MongoConnect
mongoose.connection.on('connected', function () {
  console.log('connected Mongo');
})

//MongoDisConnect
mongoose.connection.on('disconnected', function () {
  console.log('disconnected Mongo');
})

//ModelImg
var ScheMa = mongoose.Schema;
var ImgSchema = new ScheMa({
  name: String
})
var picModel = mongoose.model('pic', ImgSchema);

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

    var newImg = picModel({
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

//share Resource
app.use('/images', express.static(__dirname + '/images'));

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

app.get('/getNameimg', function (req, res) {
  picModel.find((err, doc)=>{
    res.json({result: "success", data: doc})
  })
})

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

app.post('/checkItem', function(req,res) {
  console.log(req.body.id)
  let idOBJ2 = req.body.id;

  addressModel.where('idOBJ').equals(idOBJ2).exec((err, data) => {
  console.log("query",data)
  lengthh = data.length
  console.log(lengthh)

  if(lengthh > 0) {
    idMongo = data[0]._id
    let dataSend = {wordInputOpen: data[0].wordInputOpen, 
      bitInputOpen: data[0].bitInputOpen,
      wordInputClose: data[0].wordInputClose,
      bitInputClose: data[0].bitInputClose}
    res.json(dataSend);
  } else {
    let dataSend = {Object: "not thing"}
    res.json(dataSend);
    }
  })
  //res.json({result: "success"});
})

//ModelAddress
var ScheMaAddress = mongoose.Schema;
var addressSchema = new ScheMaAddress({
  idOBJ: String,
  wordInputOpen: String,
  bitInputOpen: String,
  wordInputClose: String,
  bitInputClose: String
})
var addressModel = mongoose.model('address', addressSchema);

app.post('/addAddress', function(req, res) {
  var idOBJ1 = req.body.idObj
  var wordInputOpen1 = req.body.wordInputOpen;
  var bitInputOpen1 = req.body.bitInputOpen;
  var wordInputClose1 = req.body.wordInputClose;
  var bitInputClose1 = req.body.bitInputClose;

  var lengthh;
  var idMongo;
  console.log("body")

  // var newImg = picModel({
  //   name: namee
  // });

  addressModel.where('idOBJ').equals(idOBJ1).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    if(lengthh > 0) {
      idMongo = data[0]._id
      addressModel.findByIdAndUpdate(idMongo, {$set:{wordInputOpen: wordInputOpen1, 
        bitInputOpen: bitInputOpen1,
        wordInputClose: wordInputClose1,
        bitInputClose: bitInputClose1}},
        function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
      });
    } else {
      var newAddr = addressModel({
        idOBJ: idOBJ1,
        wordInputOpen: wordInputOpen1,
        bitInputOpen: bitInputOpen1,
        wordInputClose: wordInputClose1,
        bitInputClose: bitInputClose1
      })
      newAddr.save(function(err) {
        if (err) throw err;
    
        console.log("item's save")
      })
    }
  })
})

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Server is running.. at port: %s", port);
})
