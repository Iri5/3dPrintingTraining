const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", urlencodedParser, (request, response) => {
    let ans = request.body;

    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    console.log(request.body.title);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let query = 'INSERT INTO mydb.printer (title, extruder_heating_temp, table_heating_temp, print_speed, power, size, materials) VALUES (?, ?, ?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.extra, ans.table, ans.speed, ans.power, ans.size, ans.materials], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/modeling_admin');
    });
})
router.delete("/", (req, res) => {
    console.log("ffeerfe")
    console.log(req.body.myId)

    if (req.body) {

        query = 'DELETE FROM mydb.model WHERE printer_id = ?;';
        pool.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            query = 'DELETE FROM mydb.printer WHERE id = ?;';
            pool.query(query, [req.body.myId], function (err, data) {
                if (err) {
                    res.sendStatus(500);
                    console.log("error");
                    return console.log(err);
                }
                res.sendStatus(200);
            })

            //res.redirect('/admin');
        });
    }
    else {
        res.sendStatus(400);
    }
})
router.put('/', (req, res) => {
    console.log("done")
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    for (key in ans) {
        if (ans[key] == "") {
            ans[key] = null;
        }
    }
    console.log(ans.title);
    console.log(ans);

    let query = 'UPDATE mydb.printer SET title = ?, extruder_heating_temp = ?, table_heating_temp = ?, print_speed = ?, power = ?, size = ?, materials = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.extra, ans.table, ans.speed, ans.power, ans.size, ans.materials, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})

module.exports = router;