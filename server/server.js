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

app.post('/checkStatus', function(req,res) {

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
    let dataSend = {
      apiLinkI: data[0].apiLinkI,
      apiLinkO: data[0].apiLinkO,
      wordInputOpen: data[0].wordInputOpen, 
      bitInputOpen: data[0].bitInputOpen,
      statusInputOpen: data[0].statusInputOpen,
      wordInputClose: data[0].wordInputClose,
      bitInputClose: data[0].bitInputClose, 
      statusInputClose: data[0].statusInputClose,
      wordOutput: data[0].wordOutput,
      bitOutput: data[0].bitOutput
    }
    res.json(dataSend);
  } else {
    let dataSend = {Object: "not thing"}
    res.json(dataSend);
    }
  })
  //res.json({result: "success"});
})

///SaveItemInPage
var ScheMaIteminPage = mongoose.Schema;
var itemInPageSchema = new ScheMaIteminPage({
  idItem: String,
  classItem: String,
  srcItem: String,
  cssItem: String,
  toggleItem: String,
  targetItem: String
})
var itemInPageModel = mongoose.model('itemInPage', itemInPageSchema);

app.get('/getItemInPage', function(req,res) {
  //let itemInPage = itemInPageModel.find({});
  itemInPageModel.find({}, function (err, datas) {
    res.json(datas)
  })
})

app.post('/addItemtoPage', function(req,res) {
  var idItem1 = req.body.id;
  var classItem1 = req.body.class;
  var srcItem1 = req.body.src;
  var cssItem1 = req.body.css;
  var toggleItem1 = req.body.togle;
  var targetItem1 = req.body.target;

  var lengthhh;
  var iditemMongo;

  itemInPageModel.where('idItem').equals(idItem1).exec((err, data) => {
    console.log("query",data)
    lengthhh = data.length
    console.log(lengthhh)

    if(lengthhh > 0) {
      iditemMongo = data[0]._id
      itemInPageModel.findByIdAndUpdate(iditemMongo, {$set:{
        classItem: classItem1,
        srcItem: srcItem1, 
        cssItem: cssItem1, 
        toggleItem: toggleItem1,
        targetItem: targetItem1
      }},
        function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
      });
    } else {
      var newItemm = itemInPageModel({
        idItem: idItem1,
        classItem: classItem1,
        srcItem: srcItem1,
        cssItem: cssItem1,
        toggleItem: toggleItem1,
        targetItem: targetItem1
      })
      newItemm.save(function(err) {
        if (err) throw err;
    
        console.log("item's save")
      })
    }
  })
})

//ModelAddress
var ScheMaAddress = mongoose.Schema;
var addressSchema = new ScheMaAddress({
  idOBJ: String,
  apiLinkI: String,
  apiLinkO: String,
  wordInputOpen: String,
  bitInputOpen: String,
  statusInputOpen: String,
  wordInputClose: String,
  bitInputClose: String,
  statusInputClose: String,
  wordOutput: String,
  bitOutput: String
})
var addressModel = mongoose.model('address', addressSchema);

app.post('/addAddress', function(req, res) {
  var idOBJ1 = req.body.idObj;
  var apiLinkI1 = req.body.apiLinkI;
  var apiLinkO1 = req.body.apiLinkO;
  var wordInputOpen1 = req.body.wordInputOpen;
  var bitInputOpen1 = req.body.bitInputOpen;
  var statusInputOpen1 = req.body.statusInputOpen;
  var wordInputClose1 = req.body.wordInputClose;
  var bitInputClose1 = req.body.bitInputClose;
  var statusInputClose1 = req.body.statusInputClose;
  var wordOutput1 = req.body.wordOutput;
  var bitOutput1 = req.body.bitOutput;

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
      addressModel.findByIdAndUpdate(idMongo, {$set:{
        apiLinkI: apiLinkI1,
        apiLinkO: apiLinkO1, 
        wordInputOpen: wordInputOpen1, 
        bitInputOpen: bitInputOpen1,
        statusInputOpen: statusInputOpen1,
        wordInputClose: wordInputClose1,
        bitInputClose: bitInputClose1, 
        statusInputClose: statusInputClose1,
        wordOutput: wordOutput1,
        bitOutput: bitOutput1
      }},
        function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
      });
    } else {
      var newAddr = addressModel({
        idOBJ: idOBJ1,
        apiLinkI: apiLinkI1,
        apiLinkO: apiLinkO1,
        wordInputOpen: wordInputOpen1,
        bitInputOpen: bitInputOpen1,
        statusInputOpen: statusInputOpen1,
        wordInputClose: wordInputClose1,
        bitInputClose: bitInputClose1,
        statusInputClose: statusInputClose1,
        wordOutput: wordOutput1,
        bitOutput: bitOutput1
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
