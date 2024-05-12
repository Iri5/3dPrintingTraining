const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", urlencodedParser, (request, response) => {
    console.log('Path: /component Method: POST')
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO mydb.component (title, designation, units, type, max) VALUES (?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.designation, ans.units, ans.type, ans.max], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/modeling_admin');
    });
})
router.delete("/", (req, res) => {
    console.log('Path: /component Method: DELETE')
    if (req.body) {
        query = 'DELETE FROM mydb.model WHERE  (id > 0)  AND ( (first_factor_id = ?) OR (second_factor_id = ?) OR (response_id = ?) );';
        pool.query(query, [req.body.myId, req.body.myId, req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            query = 'DELETE FROM mydb.component WHERE id = ?;';
            pool.query(query, [req.body.myId], function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    return console.log(err);
                }
                res.sendStatus(200);
            })

            //res.redirect('/admin');
        });
    }
    else {
        res.sendStatus(400);
    }
})
router.put('/', (req, res) => {
    console.log('Path: /component Method: PUT')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'UPDATE mydb.component SET title = ?, designation = ?, units = ?, type = ?, max = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.designation, ans.units, ans.type, ans.max, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
module.exports = router;