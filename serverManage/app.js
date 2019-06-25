var express = require('express');
var app = express();
var db = require('./models/db');
var router = require('./router');

//设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/add', router.add)
app.get('/getall', router.getAll)
app.get('/query', router.query)
app.get('/edit', router.edit)
app.post('/remove', router.remove)

app.listen(2000, function(err) {
  console.log('server is listening at port 2000...')
})