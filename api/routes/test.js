const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", (request, response) => {
    let ans = request.body;
    console.log('/test post');
    console.log(ans);
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'INSERT INTO mydb.test (title, description, start, end, duration) VALUES (?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        query = 'INSERT INTO mydb.test_course (course_id, test_id) VALUES (?,?);';
        pool.query(query, [ans.courseid, data.insertId], function (err, results) {
            if (err) return console.log(err);
            response.redirect(`/detailcourse?courseID=${ans.courseid}`);
        })
        
    });
})
router.delete('/', (req, res) => {
    if (req.headers.currentid) {
        query = 'DELETE FROM mydb.test WHERE id = ?;';
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
module.exports = router;