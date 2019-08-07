const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  favorite: [{type: Schema.Types.ObjectId, ref: 'Cocktail'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;