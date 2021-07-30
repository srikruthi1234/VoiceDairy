const Dairy = require('../models/Dairy');

class TodoRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new todo
  create(name,now) {
    const newDairy = { name,date:now, done: false };
    const dairy = new this.model(newDairy);

    return dairy.save();
  }

  // return all todos

  findAll() {
    return this.model.find();
  }

  //find todo by the id
  findById(id) {
    return this.model.findById(id);
  }

    // delete todo
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update todo
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } });
  }
}

module.exports = new TodoRepository(Dairy);