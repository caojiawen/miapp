const express = require("express");
const router = express.Router();
var myQuery = require("./query");

router.post('/login', (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    var sql = `SELECT * FROM app_user WHERE name=? AND password =?`;
    myQuery(sql, [name, password]).then(result => {
        console.log(name, password, result)
        if (result.legth == 0) {
            res.send({ ok: 0, msg: result })
        } else {
            res.send({ ok: 1, msg: result })
        }
    })
})



module.exports = router