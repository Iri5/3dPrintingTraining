const express = require('express')
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    console.log('Path: /admin Method: GET')
    let query = 'SELECT fio, email, login, gr, role, bday FROM mydb.user;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        let logins = [];
        data.forEach((item, index) => {
            let bday = item.bday;
            if (bday != null) {
                bday = bday.toISOString().split('T')[0];
                item.bday = bday;
            }
            if (item.role == 1) {
                item.role = 'Обучаемый';
            }
            else if (item.role == 2) {
                item.role = 'Преподаватель';
            }
            else if (item.role == 3) {
                item.role = 'Администратор';
            }
            logins.push(item.login);
        });
        res.render('admin', { goods: data });
    });
})
router.post('/', (req, res) => {
    console.log('Path: /admin Method: POST')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    for (key in ans) {
        if (ans[key] == "") {
            ans[key] = null;
        }
    }
    bcrypt.hash(ans.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            ans.password = hash;
            let query = 'INSERT INTO mydb.user (fio, email, login, pass, gr, role, bday) VALUES (?, ?, ?, ?, ?, ?, ?);';
            pool.query(query, [ans.fio, ans.email, ans.login, ans.password, ans.group, ans.role, ans.bday], function (err, data) {
                if (err) return console.log(err);
                res.redirect('/admin');
            });
        }
    })
})
router.delete('/', (req, res) => {
    console.log('Path: /admin Method: DELETE')
    if (req.body) {
        query = 'DELETE FROM mydb.user WHERE login = ? AND id > 0;';
        pool.query(query, [req.body[0]], function (err, data) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            res.sendStatus(200);
            //res.redirect('/admin');
        });
    }
    else {
        res.sendStatus(400);
    }
})
router.put('/', (req, res) => {
    console.log('Path: /admin Method: PUT')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    for (key in ans) {
        if (ans[key] == "") {
            ans[key] = null;
        }
    }
    let query = 'UPDATE mydb.user SET fio = ?, email = ?, login = ?, gr = ?, role = ?, bday = ? WHERE login = ? AND id > 0;';
    pool.query(query, [ans.fio, ans.email, ans.login, ans.group, ans.role, ans.bday, ans.currentLogin], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
module.exports = router;