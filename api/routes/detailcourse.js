const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.get('/', urlencodedParser, (req, res) => {

    if (!req.body) {
        return res.sendStatus(400);
    }
    /*let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id})
    });*/
    let query = `SELECT mydb.test.id AS t_id, mydb.test.title AS t_title, mydb.course.title AS c_title, mydb.course.description 
    AS c_desc, mydb.course.start AS c_start, mydb.course.end AS c_end, mydb.course.id AS c_id
     FROM mydb.test JOIN mydb.test_course ON mydb.test.id = mydb.test_course.test_id JOIN mydb.course ON mydb.course.id = 
     mydb.test_course.course_id WHERE course_id = ?;`;
    pool.query(query, [req.query.courseID], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            query = 'SELECT * FROM mydb.course WHERE id = ?';
            pool.query(query, [req.query.courseID], function (err, data) {
                if (err) return console.log(err);
                res.render('course1', { title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id, t_id: null })
            })
        } else {
            let t_title = [];
            let t_id = [];
            data.forEach(i => {
                t_id.push(i.t_id);
                t_title.push(i.t_title);
            })
            console.log('data');

            console.log(data);
            res.render('course1', {
                title: data[0].c_title, 
                description: data[0].c_desc, 
                link: data[0].link, 
                id: data[0].c_id,
                t_title: t_title, 
                t_id: t_id
            },
            )
        }
    })

    /*let query = 'SELECT title, description, link FROM us.course WHERE id=?;'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })
    query = 'SELECT title, description FROM us.test WHERE id = (SELECT test_id FROM us.course_test WHERE course_id = ?);'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })*/
    //res.render('course1',);
})
module.exports = router;