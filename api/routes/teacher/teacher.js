const express = require('express')
const router = express.Router();
const pool = require('../../db');


router.get('/', (req, res) => {
    console.log('Path: /teacher')
    let query = 'SELECT id, title, description FROM mydb.course;'
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
    })
})
router.get('/courseid', (req, res) => {
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
})
router.get('/:?userid', (req, res) => {
    console.log('Path: /:?userid');
    /*let query = 'SELECT title, description FROM us.course WHERE id=?;'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })*/
})
module.exports = router;