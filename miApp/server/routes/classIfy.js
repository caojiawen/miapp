const express = require('express');
const myQuery = require('./query');
const router = express.Router();

// 轮播图
router.get('/menuLeft', (req, res) => {
    var sql = `SELECT * FROM app_classify WHERE className='menuLeft'`;
    myQuery(sql).then(result => {
        res.send(result)
    })
});

module.exports = router;