const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.delete("/", (req, res) => {

    if (req.body) {

        query = 'DELETE FROM mydb.model WHERE  id = ?;';
        pool.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            //res.redirect('/admin');
        });
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
})
router.put('/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans.title);
    console.log(ans);

    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'UPDATE mydb.model SET title = ?, equation = ?, filament_id = ?, printer_id = ?, r2 = ?, f = ?, sd = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.equation, ans.filament, ans.printer, ans.r2, ans.f, ans.sd, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
router.post("/", urlencodedParser, (request, response) => {
    console.log(request.body.title);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == "") {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO mydb.model (title, equation, filament_id, printer_id, first_factor_id, second_factor_id, response_id, r2, f, sd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.equation, ans.filament, ans.printer, ans.firstFactor, ans.secondFactor, ans.response, ans.r2, ans.f, ans.sd], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/modeling_admin');
    });
})
module.exports = router;