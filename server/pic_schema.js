var mongoose = require('mongoose');

var PicSchema = mongoose.Schema({
  nameImage: {type: String}
})

var PicModel = mongoose.model('pic', PicSchema)

module.exports = PicModel;
