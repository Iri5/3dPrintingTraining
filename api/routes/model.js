const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.delete("/", (req, res) => {
    console.log('Path: /model Method: DELETE')
    if (req.body) {

        query = 'DELETE FROM mydb.model WHERE  id = ?;';
        pool.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
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
    console.log('Path: /model Method: PUT')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
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
    console.log('Path: /model Method: POST')
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
router.get("/", urlencodedParser, (request, response) => {
    console.log('Path: /model Method: GET');
    let query = 'SELECT * FROM mydb.model;';
    pool.query(query, [], function (err, data) {
        if (err) return console.log(err);
        let models = [];
        data.forEach(elem => {
            let model = {
                id: elem.id,
                title: elem.title,
                first: elem.first_factor_id,
                second: elem.second_factor_id
            }
            models.push(model);
        })
        let Jdata = JSON.stringify(models);
        console.log(models)
        response.send(Jdata);
    });
})
router.get("/factors/:id", urlencodedParser, (request, response) => {
    console.log('Path: /model/factors/:id Method: GET');
    const id = request.params.id;
    let query = 'SELECT first_factor_id, second_factor_id FROM mydb.model WHERE id = ?;';
    pool.query(query, [id], function (err, data) {
        if (err) return console.log(err);
        let models = [];
        console.log(`SELECT first_factor_id, second_factor_id FROM mydb.model WHERE id = ${id};`)
        console.log(data)
        const first_factor_id = data[0].first_factor_id;
        const second_factor_id = data[0].second_factor_id;
        query = 'SELECT * FROM mydb.component WHERE id = ? OR id = ?';
        pool.query(query, [first_factor_id, second_factor_id], function (err, data) {
            if (err) return console.log(err);
            console.log(`SELECT * FROM mydb.component WHERE id = ${first_factor_id} OR id = ${second_factor_id};`)
            console.log(data);
            let info = {
                first_id: first_factor_id,
                first_title: null,
                first_designation: null,
                first_units: null,
                second_id: second_factor_id,
                second_title: null,
                second_designation: null,
                second_units: null,
            }
            if (data[0].id == first_factor_id){
                info.first_title = data[0].title;
                info.first_designation = data[0].designation;
                info.first_units = data[0].units;
                info.second_title = data[1].title;
                info.second_designation = data[1].designation;
                info.second_units = data[1].units;
            } else {
                info.first_title = data[1].title;
                info.first_designation = data[1].designation;
                info.first_units = data[1].units;
                info.second_title = data[0].title;
                info.second_designation = data[0].designation;
                info.second_units = data[0].units;
            }
            console.log('info');
            console.log(info);
            let Jinfo = JSON.stringify(info);
            response.send(Jinfo);
        })
        /*data.forEach(elem => {
            let model = {
                id: elem.id,
                title: elem.title,
                first: elem.first_factor_id,
                second: elem.second_factor_id
            }
            models.push(model);
        })
        let Jdata = JSON.stringify(models);
        console.log(models)
        response.send(Jdata);*/
    });
})
module.exports = router;