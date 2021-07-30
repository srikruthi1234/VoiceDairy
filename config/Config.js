module.exports = {
    //mongoDBとの接続「mongodb+srv://[ユーザーネーム]:[パスワード]@[クラスター名].~~~/[DB名]?~~~」
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb+srv://yadokarithanks:yadokarithanks@cluster0.pquur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80,
  };