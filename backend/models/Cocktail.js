const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const cocktailSchema = new Schema({
  name: String,
  ingredients:Array,
  instruction:String,
  img:String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;