const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const pool = require('../db')

router.post('/', (req, res) => {
    let {login, pass} = req.body;
    let query = 'SELECT * FROM us.user where login = ?;'
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
                if (result){
                    res.status(200).json({
                        role: data[0].role,
                        id: data[0].id
                    })
                    /*switch (data[0].role) {
                        case '3':
                            console.log("admin")
                            res.status = 200;
                            res.redirect('/admin');
                            break;
                        case '2':
                            res.status = 200;
                            res.redirect('/teach');
                            break;
                        case '1':
                            currentUserLogin = user.login;
                            res.status = 200;
                            res.redirect('/user');
                            break;
                    }*/
                }
            })
            
        }
    });
})

module.exports = router;