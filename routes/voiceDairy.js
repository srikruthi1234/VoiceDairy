const express = require('express');

const app = express.Router();
const repository = require('../respositories/VoiceRepository');

// get all todo items in the db
app.get('/', (req, res) => {
  repository.findAll().then((dairy) => {
    res.json(dairy);
    console.log(dairy);
  }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
  const { name } = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const target = year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second
  repository.create(name,target).then((dairy) => {
    res.json(dairy);
    console.log(dairy);
  }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`右記のIDの日記は消去されました: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const dairy = { name: req.body.name, done: req.body.done };
  repository.updateById(id, dairy)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
module.exports = app;