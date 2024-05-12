const express = require('express')
const router = express.Router();
const pool = require('../db');
const urlencodedParser = express.urlencoded({ extended: false });
router.post("/", urlencodedParser, (request, response) => {
    console.log('Path: /filament Method: POST')
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO mydb.filament (title, melting_point, extrusion_temp, shrinkage, density, flexural_strength, tensile_strength, elasticity) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    pool.query(query, [ans.title, ans.melting, ans.extra, ans.shrinkage, ans.density, ans.flexural_strength, ans.tensile_strength, ans.elasticity], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/modeling_admin');
    });
})
router.delete("/", (req, res) => {
    console.log('Path: /filament Method: DELETE')
    if (req.body) {

        query = 'DELETE FROM mydb.model WHERE filament_id = ?;';
        pool.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            query = 'DELETE FROM mydb.filament WHERE id = ?;';
            pool.query(query, [req.body.myId], function (err, data) {
                if (err) {
                    res.sendStatus(500);
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
    console.log('Path: /filament Method: PUT')
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'UPDATE mydb.filament SET title = ?, melting_point = ?, extrusion_temp = ?, shrinkage = ?, density = ?, flexural_strength = ?, tensile_strength = ?, elasticity = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.melting, ans.extra, ans.shrinkage, ans.density, ans.flexural_strength, ans.tensile_strength, ans.elasticity, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})

module.exports = router;