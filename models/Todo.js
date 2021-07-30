
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const todoSchema = new Schema({
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

const Todo = mongoose.model('Todo', todoSchema);//コレクション名 todos

module.exports = Todo;