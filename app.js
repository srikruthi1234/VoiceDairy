// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');

const config = require('./config/Config');

const routes = require('./routes/Routes');
const user = require('./routes/users');

// const users = require('./routes/users');


const app = express();
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("db connected");
});

// app.use(session({
//   secret: 'secret',
//   store: new MongoStore({
//       db: 'sample-login', // データベース名
//       host: 'localhost', // データベースのアドレス
//       clear_interval: 60 * 60 // 保存期間(sec)
//   }),
//   cookie: {
//       httpOnly: true, // cookieへのアクセスをHTTPのみに制限
//       maxAge: 60 * 60 * 1000 // クッキーの有効期限(msec)
//   }
// }));

app.use(cors());  //enable cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(session({
  secret: 'YOUR-SECRET-STRING',
  resave: true,
  saveUninitialized: true
}));

app.use('/todos', routes);
app.use('/users', user);

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.APP_PORT); // Listen on port defined in environment

const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) { // ログインしてるかチェック

    next();

  } else {

    res.redirect(302, '/login');

  }
};

// ログインフォーム
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error').join('<br>');
  res.render('login/form', {
    errorMessage: errorMessage
  });
});

// ログイン実行
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
  })
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req, res) => {
  const user = req.user;
  res.send('ログイン完了！');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});


module.exports = app;