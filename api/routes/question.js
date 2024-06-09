const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", (request, response) => {
    console.log('Path: /question Method: POST')
    let ans = request.body;
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'INSERT INTO mydb.question (type, test_id) VALUES (?, ?);';
    pool.query(query, [ans.type, ans.testId], function (err, data) {
        if (err) return console.log(err);
        response.status = 200;
        let sendData = JSON.stringify({
            id: data.insertId
        });
        response.send(sendData);
    });
})
router.put("/", (request, response) => {
    console.log('Path: /question Method: PUT')
    let ans = request.body;
    if (!request.body) {
        return response.sendStatus(400);
    }
    let answer = {
        type: ans.type,
        score: ans.score,
        que_text: ans.que_text,
        count_var: ans.count_var,
        ans: []
    }
    for (let i = 0; i < ans.ans.length; i++){
        let obj = {
            text: ans.ans.text,
            right: ans.ans.right
        }
        answer.ans.push(obj);
    }
    let query = 'UPDATE mydb.question SET question = ? WHERE id = ?;';
    pool.query(query, [JSON.stringify(ans), ans.id], function (err, data) {
        if (err) return console.log(err);
        response.sendStatus(200);
    });
})
router.delete("/", (request, response) => {
    console.log('Path: /question Method: DELETE')
    let ans = request.body;
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'DELETE FROM mydb.question WHERE id = ?;';
    pool.query(query, [ans.id], function (err, data) {
        if (err) return console.log(err);
        response.sendStatus(200);
    });
})
module.exports = router;