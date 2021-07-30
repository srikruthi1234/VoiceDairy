var express = require("express");
var router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

const cors = require("cors");

router.use(
  cors({
    origin: "*", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);

router.post("/create-user", (req, res) => {
  console.log(req.body.user);
  const createUser = {
    ...req.body.user,
    _id: mongoose.Types.ObjectId(),
    username:req.body.username,
    mail:req.body.mail,
    password:req.body.password
  };
  const newUser = new User(createUser);

  newUser
    .save()
    .then((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(createUser);
    })
    .catch((response) => {
      console.log(response);
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send({ response });
    });
});

router.post("/fetch-user", (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加

  console.log(req.body);
  const uid = req.body._id;
  User.findOne({ uid }).then((user) => {
    console.log(user);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(user);
  });
  // res.send(req.body)
});

router.post("/update-user", (req, res) => {
  console.log(req.body.updatedUser);
  const userToUpdate = req.body.updatedUser;
  console.log(userToUpdate);
  User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true }).then(
    (updatedUser) => {
      res.header("Content-Type", "application/json; charset=utf-8");
      console.log(updatedUser);
      //新しいuser情報のオブジェクトを返している。
      res.send({ updatedUser });
    }
  );
});

router.post("/delete-user", (req, res) => {
  const _id = req.body._id;
  User.findByIdAndDelete(_id).then((doc) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    //このdocは特に使う必要なし
    //消したuserが入っている
    res.send({ doc });
  });
});

//サーバー起動チェック用
router.get("/", (req, res) => {
  res.send({ status: "OK" });
});

module.exports = router;