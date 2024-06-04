const express = require('express')
const router = express.Router();
const pool = require('../db');
router.delete('/', (req, res) => {
    console.log('Path: /course Method: DELETE')
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
    console.log('Path: /course Method: POST')
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
    console.log('Path: /course Method: PUT')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'UPDATE mydb.course SET title = ?, description = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.description, ans.id], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
router.get('/', (req, res) => {
    console.log('Path: /course Method: GET')
    let query = 'SELECT * FROM mydb.course;';
    pool.query(query, [], function (err, data) {
        if (err) return console.log(err);
        let courses = JSON.stringify(data)
        res.send(courses);
    });
})
module.exports = router;