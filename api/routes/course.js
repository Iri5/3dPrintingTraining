const express = require('express')
const router = express.Router();
const pool = require('../db');
router.delete('/', (req, res) => {
    if (req.headers.currentid) {
        query = 'DELETE FROM mydb.course WHERE id = ?;';
        pool.query(query, [req.headers.currentid], function (err, data) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(500);
    }
})
router.post('/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'INSERT INTO mydb.course (title, description) VALUES (?, ?);'
    pool.query(query, [ans.title, ans.description], function (err, data) {
        if (err) return console.log(err);
        res.redirect('/teach');
    });
})
router.put('/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans);
    let query = 'UPDATE mydb.course SET title = ?, description = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.description, ans.id], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
module.exports = router;