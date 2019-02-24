const express = require('express');
const bodyParser = require('body-parser');
const pool = require("./pool");
const main = express();
const cors = require('cors')
// 服务器端口：5050
var server = main.listen(5060);

main.use(cors({
    origin: [
        'http://localhost:5060',
        'http://localhost:8080',
        'http://127.0.0.1:5060',
        'http://127.0.0.1:8080'
    ],
    credentials: true
}))
main.all('*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// 引入routes文件夹 模块
var Index = require('./routes/index');
var classIfy = require('./routes/classIfy')
var user = require('./routes/user')
var cart = require('./routes/cart')
var detail = require('./routes/detail')

main.use(bodyParser.urlencoded({ extended: false }));
// 静态资源文件夹：public
main.use(express.static('public'));

main.use('/index', Index)
main.use('/classIfy',classIfy)
main.use('/user',user)
main.use('/cart',cart)
main.use('/detail',detail)
