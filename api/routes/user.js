const express = require('express')
const router = express.Router();
const pool = require('../db');

router.get('/:userid', (req, res) => {
    console.log('Path: /user/:userid');
    const id = req.params.userid;
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
            console.log(sendData);
            query = `SELECT 
                        mydb.education.id AS education_id, 
                        mydb.education.start AS education_start, 
                        mydb.education.test_score AS education_test_score, 
                        mydb.education.pract_score AS education_pract_score, 
                        mydb.education.practical_id AS practical_ans_id, 
                        mydb.education.course_id AS course_id, 
                        mydb.education.user_id AS user_id,
                        mydb.course.title AS course_title,
                        mydb.material.link AS link,
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
                    LEFT JOIN mydb.material
                    ON mydb.material.course_id = mydb.course.id
                    WHERE user_id = ?`
            pool.query(query, id, function (err, data) {
                console.log(data);
                //console.log(data[0].link);
                if (data.length != 0) {
                    sendData.educations = data;
                    console.log(sendData);
                    res.status = 200;
                    res.render('user', { data: sendData});
                }
                else {
                    res.status = 200;
                    res.render('user', { data: sendData});
                }
            })
        }
        else res.sendStatus(403);
    })

})
router.get('/', (req, res) => {
    console.log('Path: /user Method: GET')
    
    //res.render('student');
})


module.exports = router;