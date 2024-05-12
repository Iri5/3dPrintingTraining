const express = require('express')
const router = express.Router();
const pool = require('../db');
router.get('/', (req, res) => {

    query = `SELECT mydb.practical_task.id, mydb.practical_task.number, 
    mydb.practical_task.text, mydb.practical_task.model_id, mydb.model.title 
    FROM mydb.practical_task JOIN mydb.model ON mydb.practical_task.model_id 
    = mydb.model.id;`;
    pool.query(query, function (err, data) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.render('tasks', {tasks: data});
    });
    
})
module.exports = router;