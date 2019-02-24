const express = require('express');
const myQuery = require('./query');
const router = express.Router();

// 轮播图
router.get('/', (req, res) => {
    var mid = req.query.mid;
    var details = {};
    var sql = `SELECT * FROM app_detail_img WHERE mid=? AND classIfy="banner"`;
    myQuery(sql, [mid]).then(result => {
        details.banner = result;
        var sql = `SELECT * FROM app_detail_content WHERE mid=?`;
        return myQuery(sql, [mid])
    }).then(result => {
        details.content = result;
        var sql = `SELECT * FROM app_detail_img WHERE mid=? AND classIfy="iconList"`;
        return myQuery(sql, [mid])
    }).then(result => {
        details.icons = result
        var sql = `SELECT * FROM app_detail_option WHERE mid=? AND classIfy="size"`;
        return myQuery(sql, [mid])
    }).then(result => {
        details.optionSize = result;
        var sql = `SELECT * FROM app_detail_option WHERE mid=? AND classIfy="color"`;
        return myQuery(sql, [mid])
    }).then(result => {
        details.optionColor = result;
        var sql = `SELECT * FROM app_detail_comment WHERE mid=?`;
        return myQuery(sql, [mid])
    }).then(result => {
        details.comment = result;
        var sql = `SELECT * FROM app_detail_img WHERE mid=? AND classIfy ="param"`;
        return myQuery(sql, [mid])
    }).then(result=>{
        details.paramImg = result;
        res.send(details)
    })
});

module.exports = router;