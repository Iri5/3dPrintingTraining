const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", urlencodedParser, (req, res) => {
    console.log('Path: /complete-test Method: POST')
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.body);
    let testId = req.body.id;
    let educationId = req.body.educationId;
    let questions = req.body.questions;
    /*let ans = req.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO mydb.component (title, designation, units, type, max) VALUES (?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.designation, ans.units, ans.type, ans.max], function (err, data) {
        if (err) return console.log(err);
        res.redirect('/modeling_admin');
    });*/
})
module.exports = router;