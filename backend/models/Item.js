const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const itemSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;