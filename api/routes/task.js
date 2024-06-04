const express = require('express')
const router = express.Router();
const pool = require('../db');
router.get('/', (req, res) => {
    console.log('Path: /task Method: GET')
    const taskId = req.headers.currentid;

    let query = `SELECT mydb.practical_task.answers, mydb.practical_task.number, 
    mydb.practical_task.text, mydb.practical_task.model_id, mydb.model.title, mydb.component.designation
    , mydb.component.title AS ctitle
    FROM mydb.practical_task JOIN mydb.model ON mydb.practical_task.model_id 
    = mydb.model.id JOIN mydb.component ON mydb.model.first_factor_id = mydb.component.id OR 
    mydb.model.second_factor_id = mydb.component.id
    WHERE mydb.practical_task.id = ${taskId}`;
    pool.query(query, function (err, data) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        let info = {
            id: taskId,
            number: data[0].number,
            text: data[0].text,
            answers: data[0].answers,
            model_id: data[0].model_id,
            title: data[0].title,
            ffactor: data[0].designation,
            sfactor: data[1].designation,
            ftitle: data[0].ctitle,
            stitle: data[1].ctitle,
        }
        let Jdata = JSON.stringify(info);
        res.send(Jdata)
        //res.render('tasks', {tasks: data});
    });
    
})
router.post('/', (req, res) => {
    console.log('Path: /task Method: POTS');
    if (!req.body) return;
    console.log(req.body);
    const text = req.body.text;
    const number = req.body.number;
    const model_id = req.body.model;
    const answers = {
        firstfactor: {
            max: req.body.first_factor_to,
            min: req.body.first_factor_from,
        },
        secondfactor: {
            max: req.body.second_factor_to,
            min: req.body.second_factor_from,
        }
    };
    const Janswers = JSON.stringify(answers);
    let query = 'INSERT INTO mydb.practical_task (text, number, answers, model_id) VALUES (?, ?, ?, ?);';
    pool.query(query, [text, number, Janswers, model_id], function(err, data){
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        } else{
            res.redirect('/tasks');
        }
    })
})
router.put('/', (req, res) => {
    console.log('Path: /task Method: PUT');
    if (!req.body) return;
    console.log(req.body);
    const text = req.body.text;
    const id = req.body.id;
    const answers = req.body.answers;
    
    let query = 'UPDATE mydb.practical_task SET text = ?, answers = ? WHERE id = ?;';
    pool.query(query, [text, answers, id], function(err, data){
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        } else{
            res.sendStatus(200);
            //res.redirect('/tasks');
        }
    })
})
router.delete('/', (req, res) => {
    console.log('Path: /task Method: DELETE')
    const taskId = req.headers.currentid;

    let query = `DELETE FROM mydb.practical_task WHERE id = ${taskId}`;
    pool.query(query, function (err, data) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        
        res.sendStatus(200)
        //res.render('tasks', {tasks: data});
    });
    
})
module.exports = router;