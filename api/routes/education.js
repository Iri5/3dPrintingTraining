const express = require('express')
const router = express.Router();
const pool = require('../db');
router.post('/', (req, res) => {
    console.log('Path: /education Method: POST');
    if (!req.body) return;
    console.log(req.body);
    const id = req.body.id;
    let query = 'INSERT INTO mydb.education (user_id) VALUES (?);';
    pool.query(query, [id], function (err, data) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        } else {
            let info = {
                insert: data.insertId
            }
            let Jinfo = JSON.stringify(info);
            console.log(Jinfo)
            res.send(Jinfo);
            //res.redirect('/tasks');
        }
    })
})
/*router.put('/', (req, res) => {
    console.log('Path: /education Method: PUT');
    if (!req.body) return;
    console.log(req.body);

    let query = 'UPDATE mydb.education SET course_id = ? WHERE id = ?;';
    pool.query(query, [req.body.course, req.body.id], function (err, data) {
        if (err) {
            //res.sendStatus(500);
            return console.log(err);
        } else {
            console.log(data);
            res.sendStatus(200);
            //res.send(Jinfo);
            //res.redirect('/tasks');
        }
    })
    if (req.body.practic != null){
        let query_practical = 'INSERT INTO mydb.practical_answer (practical_task_id) VALUES (?)';
        pool.query(query_practical, [req.body.practic], function(err, data){
            if (err) return console.log(err);
            let id = data.insertId;
            let query_edit_practical = 'UPDATE mydb.education SET practical_id = ? WHERE education_id = ?;';
            pool.query(query_edit_practical, [id, req.body.id], function(err, data){
            if (err) return console.log(err);

            })
        })
    }

})*/
router.put('/course', (req, res) => {
    console.log('Path: /education/course Method: PUT');
    if (!req.body) return;
    console.log(req.body);
    let query = 'UPDATE mydb.education SET course_id = ? WHERE id = ?;';
    pool.query(query, [req.body.course, req.body.id], function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            console.log(data);
            res.sendStatus(200);
        }
    })
})
router.put('/practic', (req, res) => {
    console.log('Path: /education/practic Method: PUT');
    if (!req.body) return;
    console.log(req.body);
    let query = 'INSERT INTO mydb.practical_answer (practical_task_id) VALUES (?)';
    pool.query(query, [req.body.practic], function (err, data) {
        if (err) return console.log(err);
        let id = data.insertId;
        query = 'UPDATE mydb.education SET practical_id = ? WHERE id = ?;';
        pool.query(query, [id, req.body.id], function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                console.log(data);
                res.sendStatus(200);
            }
        })
    })
})
module.exports = router;