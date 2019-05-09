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
  name: String,
  class: String
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

    // var newImg = picModel({
    //   name: namee
    // });

    if ((namee.search("tank"))>-1){
      console.log("classTank")
      picModel.where('name').equals(namee).exec((err, data) => {
        console.log("query",data)
        lengthhh = data.length
        console.log(lengthhh)
    
        if(lengthhh > 0) {
          iditemMongo = data[0]._id
          picModel.findByIdAndUpdate(iditemMongo, {$set:{
            class: "tank"
          }},
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
          });
        } else {
          var newImg = picModel({
            name: namee,
            class: "tank"
          })
          newImg.save(function(err) {
            if (err) throw err;
        
            console.log("item's save")
          })
        }
      })
    }else if ((namee.search("pipe"))>-1){
      console.log("classPipe")
      picModel.where('name').equals(namee).exec((err, data) => {
        console.log("query",data)
        lengthhh = data.length
        console.log(lengthhh)
    
        if(lengthhh > 0) {
          iditemMongo = data[0]._id
          picModel.findByIdAndUpdate(iditemMongo, {$set:{
            class: "pipe"
          }},
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
          });
        } else {
          var newImg = picModel({
            name: namee,
            class: "pipe"
          })
          newImg.save(function(err) {
            if (err) throw err;
        
            console.log("item's save")
          })
        }
      })
    }else if ((namee.search("pump"))>-1){
      console.log("classPump")
      picModel.where('name').equals(namee).exec((err, data) => {
        console.log("query",data)
        lengthhh = data.length
        console.log(lengthhh)
    
        if(lengthhh > 0) {
          iditemMongo = data[0]._id
          picModel.findByIdAndUpdate(iditemMongo, {$set:{
            class: "pump"
          }},
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
          });
        } else {
          var newImg = picModel({
            name: namee,
            class: "pump"
          })
          newImg.save(function(err) {
            if (err) throw err;
        
            console.log("item's save")
          })
        }
      })
    }else if ((namee.search("led"))>-1){
      console.log("classLED")
      picModel.where('name').equals(namee).exec((err, data) => {
        console.log("query",data)
        lengthhh = data.length
        console.log(lengthhh)
    
        if(lengthhh > 0) {
          iditemMongo = data[0]._id
          picModel.findByIdAndUpdate(iditemMongo, {$set:{
            class: "led"
          }},
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            console.log(doc);
          });
        } else {
          var newImg = picModel({
            name: namee,
            class: "led"
          })
          newImg.save(function(err) {
            if (err) throw err;
        
            console.log("item's save")
          })
        }
      })
    }

    // newImg.save(function(err) {
    //   if (err) throw err;

    //   console.log("namecome")
    // })
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

app.post('/checkItemPump', function(req,res) {
  console.log(req.body.id)
  let idOBJ2 = req.body.id;

  addressPumpModel.where('idOBJ').equals(idOBJ2).exec((err, data) => {
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

app.post('/checkItemTank', function(req,res) {
  console.log(req.body.id)
  let idOBJ2 = req.body.id;

  addressTankModel.where('idOBJ').equals(idOBJ2).exec((err, data) => {
  console.log("query",data)
  lengthh = data.length
  console.log(lengthh)

  if(lengthh > 0) {
    idMongo = data[0]._id
    let dataSend = {
      apiLinkO: data[0].apiLinkO,
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

app.post('/checkItemTemp', function(req,res) {
  console.log(req.body.id)
  let idOBJ2 = req.body.id;

  addressTempOutModel.where('idOBJ').equals(idOBJ2).exec((err, data) => {
  console.log("query",data)
  lengthh = data.length
  console.log(lengthh)

  if(lengthh > 0) {
    idMongo = data[0]._id
    let dataSend = {
      apiLinkO: data[0].apiLinkO,
      TempID: data[0].TempID
    }
    res.json(dataSend);
  } else {
    let dataSend = {Object: "not thing"}
    res.json(dataSend);
    }
  })
  //res.json({result: "success"});
})

//SaveNeedOutputItem
var ScheMaShowOutput = mongoose.Schema;
var ShowOutputSchema = new ScheMaShowOutput({
  idItem: String,
  classItem: String
})
var itemShowOutputModel = mongoose.model('itemShowOutput', ShowOutputSchema);
app.get('/getShowOutout', function(req,res) {
  itemShowOutputModel.find({}, function (err, datas) {
    res.json(datas)
  })
})
app.post('/addShowOutput', function(req,res) {
  var idItem2 = req.body.id;
  var classItem2 = req.body.class;
  var lengthhhh;
  var idShowMongo;

  itemShowOutputModel.where('idItem').equals(idItem2).exec((err, data) => {
    console.log("query",data)
    lengthhhh = data.length
    console.log(lengthhhh)

    if(lengthhhh > 0) {
      //nothing
    } else {
      var newItemm = itemShowOutputModel({
        idItem: idItem2,
        classItem: classItem2
      })
      newItemm.save(function(err) {
        if (err) throw err;
    
        console.log("item's save")
      })
    }
  })
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

//TempOutModelAdress
var ScheMaAddressTempOut = mongoose.Schema;
var addressSchemaTempOut = new ScheMaAddressTempOut({
  idOBJ: String,
  classOBJ: String,
  apiLinkO: String,
  TempID: String
})
var addressTempOutModel = mongoose.model('addressTemp', addressSchemaTempOut);
app.post('/getValuefromAddrTemp', function(req,res) {
  var idshow = req.body.idddd;
  var lenghtt;
  var idNeed;

  addressTempOutModel.where('idOBJ').equals(idshow).exec((err, data) => {
    console.log("TempQuery",data)
    lengthh = data.length
    console.log(lengthh)

    res.json(data[0])
  })
})
app.post('/addAddressTemp', function(req, res) {
  var idOBJ1 = req.body.idObj;
  var apiLinkO1 = req.body.apiLinkO;
  var classOBJ1 = req.body.classObj;
  var TempID1 = req.body.TempID;

  var lengthh;
  var idMongo;
  console.log("body")

  addressTempOutModel.where('idOBJ').equals(idOBJ1).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    if(lengthh > 0) {
      idMongo = data[0]._id
      addressTempOutModel.findByIdAndUpdate(idMongo, {$set:{
        apiLinkO: apiLinkO1, 
        TempID: TempID1
      }},
        function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
      });
    } else {
      var newAddr = addressTempOutModel({
        idOBJ: idOBJ1,
        classOBJ: classOBJ1,
        apiLinkO: apiLinkO1,
        TempID: TempID1
      })
      newAddr.save(function(err) {
        if (err) throw err;
    
        console.log("item's save")
      })
    }
  })
})

//TankModelAddress
var ScheMaAddressTank = mongoose.Schema;
var addressSchemaTank = new ScheMaAddressTank({
  idOBJ: String,
  classOBJ: String,
  srcOBJ: String,
  apiLinkO: String,
  wordOutput: String,
  bitOutput: String
})
var addressTankModel = mongoose.model('addressTank', addressSchemaTank);
app.post('/getValuefromAddrTank', function(req,res) {
  var idshow = req.body.idddd;
  var lenght;
  var idNeed;

  addressTankModel.where('idOBJ').equals(idshow).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    res.json(data[0])
  })
})
app.post('/addAddressTank', function(req, res) {
  var idOBJ1 = req.body.idObj;
  var apiLinkO1 = req.body.apiLinkO;
  var classOBJ1 = req.body.classObj;
  var srcOBJ1 = req.body.srcObj;
  var wordOutput1 = req.body.wordOutput;
  var bitOutput1 = req.body.bitOutput;

  var lengthh;
  var idMongo;
  console.log("body")

  addressTankModel.where('idOBJ').equals(idOBJ1).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    if(lengthh > 0) {
      idMongo = data[0]._id
      addressTankModel.findByIdAndUpdate(idMongo, {$set:{
        apiLinkO: apiLinkO1, 
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
      var newAddr = addressTankModel({
        idOBJ: idOBJ1,
        classOBJ: classOBJ1,
        srcOBJ: srcOBJ1,
        apiLinkO: apiLinkO1,
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

//PumpModelAddress
var ScheMaAddressPump = mongoose.Schema;
var addressSchemaPump = new ScheMaAddressPump({
  idOBJ: String,
  classOBJ: String,
  srcOBJ: String,
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
var addressPumpModel = mongoose.model('addressPump', addressSchemaPump);

app.post('/getValuefromAddrPump', function(req,res) {
  var idshow = req.body.idddd;
  var lenght;
  var idNeed;

  addressPumpModel.where('idOBJ').equals(idshow).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    res.json(data[0])
  })
})

app.post('/addAddressPump', function(req, res) {
  var idOBJ1 = req.body.idObj;
  var classOBJ1 = req.body.classObj;
  var scrOBJ1 = req.body.srcObj;
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

  addressPumpModel.where('idOBJ').equals(idOBJ1).exec((err, data) => {
    console.log("query",data)
    lengthh = data.length
    console.log(lengthh)

    if(lengthh > 0) {
      idMongo = data[0]._id
      addressPumpModel.findByIdAndUpdate(idMongo, {$set:{
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
      var newAddr = addressPumpModel({
        idOBJ: idOBJ1,
        classOBJ: classOBJ1,
        srcOBJ: scrOBJ1,
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

app.post('/deleteItem', function(req, res) {
  var deleteID = req.body.id;
  var deleteClass = req.body.class;
  console.log("deleteID",deleteID)
  console.log("deleteClass",deleteClass)
  if (deleteClass=="pump" || deleteClass=="tank" || deleteClass=="temp")
  {
    console.log(deleteID)
    if(deleteClass=="pump")
    {
      addressPumpModel.where('idOBJ').equals(deleteID).exec((err, data) => {
        data[0]._id
        addressPumpModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinPump")
        })
      })
      itemInPageModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemInPageModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinPage")
        })
      })
      itemShowOutputModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemShowOutputModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinShowOutput")
        })
      })
    }
    else if(deleteClass=="tank")
    {
      addressTempOutModel.where('idOBJ').equals(deleteID).exec((err, data) => {
        data[0]._id
        addressTankModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinTemp")
        })
      })
      itemInPageModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemInPageModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinPage")
        })
      })
      itemShowOutputModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemShowOutputModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinShowOutput")
        })
      })
    }
    else if(deleteClass=="temp")
    {
      console.log("deleteID",deleteID)
      console.log("deleteClass",deleteClass)
      addressTempOutModel.where('idOBJ').equals(deleteID).exec((err, data) => {
        data[0]._id
        addressTempOutModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinPump")
        })
      })
      itemInPageModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemInPageModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinPage")
        })
      })
      itemShowOutputModel.where('idItem').equals(deleteID).exec((err, data) => {
        data[0]._id
        itemShowOutputModel.findByIdAndRemove(data[0]._id, (err, data) => {
          console.log("deleteinShowOutput")
        })
      })
    }
  }
  else
  {
    console.log("normalDelte")
    itemInPageModel.where('idItem').equals(deleteID).exec((err, data) => {
      data[0]._id
      itemInPageModel.findByIdAndRemove(data[0]._id, (err, data) => {
        console.log("deleteinPage")
      })
    })
  }
  let dataSend = {stat: "ok"}
  res.json(dataSend);
})

var ScheMaLog = mongoose.Schema;
var LogSchema = new ScheMaLog({
  idLOG: String,
  wordLOG: String,
  bitLOG: String,
  statLOG: String,
  timeLOG: String
})
var LogModel = mongoose.model('LogActivity', LogSchema);
app.get('/getLogActibity', function(req,res) {
  LogModel.find({}, function (err, datas) {
    res.json(datas)
  })
})
app.post('/addLogActivity', function(req,res) {
  var idLOG1 = req.body.idLog;
  var wordLOG1 = req.body.wordLog;
  var bitLOG1 = req.body.bitLog;
  var statLOG1 = req.body.statLog;
  var timeLOG1 = req.body.timeLog;

  var newLOG = LogModel({
    idLOG: idLOG1,
    wordLOG: wordLOG1,
    bitLOG: bitLOG1,
    statLOG: statLOG1,
    timeLOG: timeLOG1
  })
  newLOG.save(function(err) {
    if (err) throw err;

    console.log("item's save")
  })
})

var ScheMaLogTemp = mongoose.Schema;
var LogTempSchema = new ScheMaLogTemp({
  idLOG: String,
  TemperatureLOG: String,
  timeLOG: String
})
var LogTempModel = mongoose.model('LogTemperature', LogTempSchema);
app.get('/getLogTemperature', function(req,res) {
  LogTempModel.find({}, function (err, datas) {
    res.json(datas)
  })
})
app.post('/addLogTemperature', function(req,res) {
  var idLOG1 = req.body.idLog;
  var TemperatureLOG1 = req.body.TMPLog;
  var timeLOG1 = req.body.timeLog;

  var newLOG = LogTempModel({
    idLOG: idLOG1,
    TemperatureLOG: TemperatureLOG1,
    timeLOG: timeLOG1
  })
  newLOG.save(function(err) {
    if (err) throw err;

    console.log("item's save")
  })
})

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log("Server is running.. at port: %s", port);
})
