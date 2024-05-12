const express = require('express')
const router = express.Router();
const pool = require('../db');
router.get('/', (req, res) => {
    const taskId = req.headers.currentid;

    query = `SELECT mydb.practical_task.answers, mydb.practical_task.number, 
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
        console.log(data)
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
        console.log(info)
        let Jdata = JSON.stringify(info);
        res.send(Jdata)
        //res.render('tasks', {tasks: data});
    });
    
})
module.exports = router;