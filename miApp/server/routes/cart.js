const express = require("express");
const router = express.Router();
var myQuery = require("./query");

router.get('/', (req, res) => {
    var uid = req.query.uid;
    var sql = `SELECT * FROM app_cart WHERE uid=?`;
    myQuery(sql, [uid]).then(result => {
        res.send(result)
    })
})
router.post('/removeCart', (req, res) => {
    var id = req.body.id;
    var sql = `DELETE FROM app_cart WHERE id=?`;
    myQuery(sql, [id]).then(result => {
        res.send({ code: 1, msg: 'ok', data: result })

    })
})
router.post('/addCart', (req, res) => {
    let { mid, uid, cart_title, cart_price, cart_pic, cart_count } = req.body
    console.log(mid, uid, cart_title, cart_price, cart_pic, cart_count)
    var sql = `INSERT INTO app_cart (id, uid, mid, cart_price, cart_pic, cart_title, cart_count,seleted) VALUES (NULL, ?, ?, ?, ?, ?, ?,1)`;
    myQuery(sql, [uid,mid,cart_price,cart_pic,cart_title,cart_count]).then(result => {
        res.send({ code: 1, msg: 'ok', data: result })
    })
})



module.exports = router