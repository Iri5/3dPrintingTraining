const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", (request, response) => {
    console.log('Path: /test Method: POST')
    let ans = request.body;
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
router.put("/", (request, response) => {
    console.log('Path: /test Method: PUT')
    if (!request.body) {
        return res.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    
    let query = 'UPDATE mydb.test SET title = ?, description = ?, start = ?, end = ?, duration = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration, ans.t_id], function (err, data) {
        if (err) return console.log(err);
        //response.redirect(`/test/${ans.t_id}`);
        response.sendStatus(200);
    });
})
function FormateData(date) {
    return (String(date.getFullYear()).padStart(2, '0') + '-' +
        String(date.getMonth()).padStart(2, '0') + '-' +
        String(date.getDay()).padStart(2, '0'));
}
router.get("/:testId", (request, response) => {
    console.log('Path: /test/:testId Method: GET')
    let id = request.params.testId;
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = `SELECT mydb.test.id as t_id, mydb.test.title, mydb.test.description, mydb.test.start, mydb.test.end, mydb.test.duration, mydb.question.id,  mydb.question.type,  mydb.question.question
    FROM mydb.test
    JOIN mydb.question 
    ON mydb.test.id = mydb.question.test_id 
    WHERE test_id = ?;`;
    pool.query(query, [id], function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            

            response.render('add_test', {
                t_id: data[0].t_id,
                title: data[0].title,
                description: data[0].description,
                start: FormateData(data[0].start),
                end: FormateData(data[0].end),
                duration: data[0].duration,
                questions: data
            },)
        }
        else{
            query = "SELECT * FROM mydb.test WHERE mydb.test.id = ?";
            pool.query(query, [id], function (err, data) {
                if (err) return console.log(err);
               
                response.render('add_test', {
                    t_id: id,
                    title: data[0].title,
                    description: data[0].description,
                    start: FormateData(data[0].start),
                    end: FormateData(data[0].end),
                    duration: data[0].duration,
                    questions: null
                },)
            });
        }
    });
})
router.delete('/', (req, res) => {
    console.log('Path: /test Method: DELETE')
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