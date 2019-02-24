const express = require('express');
const myQuery = require('./query');
const router = express.Router();

// 轮播图
router.get('/banner', (req, res) => {
    var sql = "SELECT * FROM app_index WHERE classIfy = 'banner'";
    myQuery(sql).then(result => {
        res.send(result)
    })
});
// 图标列表
router.get('/icon', (req, res) => {
    var sql = "SELECT * FROM app_index WHERE classIfy = 'icon'";
    myQuery(sql).then(result => {
        res.send(result)
    })
})
// 商品推荐列表
router.get('/recommend', (req, res) => {
    var sql = "SELECT * FROM app_index WHERE classIfy = 'recommend'";
    myQuery(sql).then(result => {
        res.send(result)
    })
})
// 每日精选列表
router.get('/dailySelect', (req, res) => {
    var dailySelect = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='dailySelect'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        dailySelect.data = result;
        dailySelect.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        dailySelect.advertisement = result[0].img
        res.send(dailySelect)
    })
})
// 小米电视列表
router.get('/xiaomiTV', (req, res) => {
    var xiaomiTV = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='xiaomiTv'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        xiaomiTV.data = result;
        xiaomiTV.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        xiaomiTV.advertisement = result[1].img
        res.send(xiaomiTV)
    })
})
// 小米笔记本列表
router.get('/notebook', (req, res) => {
    var notebook = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='notebook'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        notebook.data = result;
        notebook.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        notebook.advertisement = result[2].img
        res.send(notebook)
    })
})
// 明星单品列表
router.get('/starProduct', (req, res) => {
    var starProduct = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='starProduct'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        starProduct.data = result;
        starProduct.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        starProduct.advertisement = result[3].img
        res.send(starProduct)
    })
})
// 新品上线
router.get('/newProduct', (req, res) => {
    var newProduct = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='newProduct'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        newProduct.data = result;
        newProduct.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        newProduct.advertisement = result[4].img
        res.send(newProduct)
    })
})
// 新品上线
router.get('/AI', (req, res) => {
    var AI = {}
    var sql = "SELECT * FROM app_index WHERE classIfy='AI'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        AI.data = result;
        AI.className = result[0].className
        return myQuery(sql)
    }).then(result => {
        AI.advertisement = result[5].img
        res.send(AI)
    })
})
// 其他商品
router.get('/others', (req, res) => {
    var others = {};
    var sql = "SELECT * FROM app_index WHERE classIfy='others'";
    myQuery(sql).then(result => {
        var sql = "SELECT * FROM app_index WHERE classIfy='advertisement'";
        others.data = result;
        others.className = result[0].className;
        return myQuery(sql)
    }).then(result=>{
        others.advertisement = result[6].img;
        res.send(others)
    })
})

module.exports = router;