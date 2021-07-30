
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const dairySchema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  user:{
    type:String,
  }
});

const Dairy = mongoose.model('Dairy', dairySchema);//コレクション名 dairies

module.exports = Dairy;