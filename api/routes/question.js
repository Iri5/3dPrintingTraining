const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", (request, response) => {
    let ans = request.body;
    console.log(ans);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'INSERT INTO mydb.question (type, test_id) VALUES (?, ?);';
    //response.status = 200;
    //let sendData = JSON.stringify({
    //    id: 5
    //});
    //response.send(sendData);
    pool.query(query, [ans.type, ans.testId], function (err, data) {
        if (err) return console.log(err);
        console.log('inserted id')
        console.log(data.insertId);
        response.status = 200;
        let sendData = JSON.stringify({
            id: data.insertId
        });
        response.send(sendData);
       // response.redirect(`/detailcourse?courseID=${ans.courseid}`);

    });
})
router.put("/", (request, response) => {
    let ans = request.body;
    console.log('put question');

    console.log(ans);
    console.log(ans.id);
    console.log(ans.type);
    console.log(ans.score);
    console.log(ans.que_text);
    console.log(ans.count_var);
    console.log(ans.ans);
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
    let array
    for (let i = 0; i < ans.ans.length; i++){
        let obj = {
            text: ans.ans.text,
            right: ans.ans.right
        }
        answer.ans.push(obj);
    }
    console.log(answer);
    console.log(JSON.stringify(answer));
    let query = 'UPDATE mydb.question SET question = ? WHERE id = ?;';
    //response.status = 200;
    //let sendData = JSON.stringify({
    //    id: 5
    //});
    //response.send(sendData);
    pool.query(query, [JSON.stringify(ans), ans.id], function (err, data) {
        if (err) return console.log(err);
        response.sendStatus(200);
       // response.redirect(`/detailcourse?courseID=${ans.courseid}`);

    });
})
router.delete("/", (request, response) => {
    let ans = request.body;
    console.log(ans);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'DELETE FROM mydb.question WHERE id = ?;';
  
    pool.query(query, [ans.id], function (err, data) {
        if (err) return console.log(err);
        
        response.sendStatus(200);
       // response.redirect(`/detailcourse?courseID=${ans.courseid}`);

    });
})
module.exports = router;