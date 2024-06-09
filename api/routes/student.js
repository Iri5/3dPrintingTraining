const express = require('express')
const router = express.Router();
const pool = require('../db');

router.get('/:studid', (req, res) => {
    console.log('Path: /student/:studid');
    const id = req.params.studid;
    console.log(id);
    let query1 = ''
    let query = 'SELECT fio, gr FROM mydb.user WHERE id=?;'
    pool.query(query, id, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            let sendData = {
                user_id: id,
                fio: data[0].fio,
                gr: data[0].gr,
                educations: [],
            }
            query = `SELECT 
                        mydb.education.id AS education_id, 
                        mydb.education.start AS education_start, 
                        mydb.education.test_score AS education_test_score, 
                        mydb.education.pract_score AS education_pract_score, 
                        mydb.education.practical_id AS practical_ans_id, 
                        mydb.education.course_id AS course_id, 
                        mydb.education.user_id AS user_id,
                        mydb.course.title AS course_title,
                        mydb.practical_answer.answer AS practical_answer_text,
                        mydb.practical_answer.practical_task_id AS practical_task_id,
                        mydb.practical_task.text AS practical_task_text
                    FROM mydb.education 
                    LEFT JOIN mydb.course 
                    ON mydb.course.id = mydb.education.course_id
                    LEFT JOIN mydb.practical_answer 
                    ON mydb.practical_answer.id = mydb.education.practical_id
                    LEFT JOIN mydb.practical_task 
                    ON mydb.practical_task.id = mydb.practical_answer.practical_task_id  
                    WHERE user_id = ?`
            pool.query(query, id, function (err, data) {
                if (data.length != 0) {
                    sendData.educations = data;
                    res.status = 200;
                    res.render('student', { data: sendData});
                }
                else {
                    sendData.educations = null;
                    res.status = 200;
                    res.render('student', { data: sendData});
                }
            })
        }
        else res.sendStatus(403);
    })

})
router.get('/', (req, res) => {
    console.log('Path: /student Method: GET')
    /*let query = 'SELECT id, title, description FROM mydb.course;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            let infoClient = {};
            infoClient.courses = data;
            query = 'SELECT id, fio, gr FROM mydb.user WHERE role = 1';
            pool.query(query, function (err, data) {
                if (err) return console.log(err);
                if (data.length != 0) {
                    infoClient.students = data;
                    res.status = 200;
                    res.render('teac', { info: infoClient });
                }
            })
        }
        else res.sendStatus(403);
    })*/
    res.render('student');
})
/*router.get('/courseid', (req, res) => {
    console.log('Path: /courseid');
    let query = 'SELECT title, description FROM mydb.course WHERE id=?;'
    pool.query(query, req.query.id, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })
})*/

module.exports = router;