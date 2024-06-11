const express = require('express')
const router = express.Router();
const pool = require('../db');
router.get('/:link', (req, res) => {
    console.log('Path: /study/:link Method: GET')

    let path = `materials/${req.params.link}`
    res.render('study', { link: path })
})
router.get('/test/:course', (req, res) => {
    console.log('Path: /study/test/:course Method: GET')
    console.log(req.params.course);
    let query = `SELECT test.*, 
		                question.id AS que_id, 
                        question.type, 
                        question.question
                FROM test_course 
                INNER JOIN test 
		            ON (test.id = test_course.test_id)
		            INNER JOIN question 	
			            ON (question.test_id = test_course.test_id)
                WHERE test_course.course_id =?`
    pool.query(query, req.params.course, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            let sendData = {
                testInfo: {
                    id: data[0].id,
                    description: data[0].description,
                    title: data[0].title,
                    start: data[0].start,
                    end: data[0].end,
                    duration: data[0].duration
                },
                queInfo: data
            }
            res.render('test', sendData)
        }
    }
    )
    //let path =`materials/${req.params.link}`
    //res.render('study', {link: path})
})
module.exports = router;