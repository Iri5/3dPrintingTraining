const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const pool = require('../db')

router.post('/', (req, res) => {
    console.log('Path: /auth Method: POST')
    let { login, pass } = req.body;
    let query = 'SELECT * FROM mydb.user where login = ?;'
    pool.query(query, [login], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            res.sendStatus(403)
        }
        else {
            bcrypt.compare(pass, data[0].pass, (err, result) => {
                if (err) {
                    console.log("Auth failed: ")
                }
                if (result) {
                    console.log(data[0].role);
                    console.log(data[0].id)
                    res.status(200).json({
                        role: data[0].role,
                        id: data[0].id
                    })
                    
                }
            })
        }
    });
})

module.exports = router;