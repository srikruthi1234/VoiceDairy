const express = require('express');

const app = express.Router();
const repository = require('../respositories/TodoRepository');

const cors = require("cors");

// app.use(
//   cors({
//     origin: "*", //アクセス許可するオリジン
//     credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//     optionsSuccessStatus: 200, //レスポンスstatusを200に設定
//   })
// );

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('slsls');

// get all todo items in the db
app.get('/', (req, res) => {
  repository.findAll().then((todos) => {
    res.json(todos);
    console.log('get',todos);
  }).catch((error) => console.log(error));
});

app.get('/about', (req, res) => {
  repository.findAll().then((todos) => {
    res.json(todos);
    console.log(todos);
  }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
  const { name } = req.body;
  const {user} = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const target = year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second
  repository.create(name,target,user).then((todo) => {
    res.json(todo);
    console.log(todo);
    console.log('nameの確認',name);
    console.log('reqの確認',req);
    console.log('runrunrun');
  }).catch((error) => console.log(error));
});

app.post('/about', (req, res) => {
  const { name } = req.body;
  // const {user} = req.body;
  repository.create(name).then((todo) => {
    res.json(todo);
    console.log(todo);
    console.log('runrunrun');
  }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`左記のIDのタスクは消去されました: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  repository.updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
module.exports = app;