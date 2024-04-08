const fs = require('fs');
const express = require('express')
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
const mysql = require('mysql2');
const { dirname } = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');



/*bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
    } else {
        hashpass = hash;
        bcrypt.compare(pass, hashpass, (err, result) => {
            if (err) {} 
            if (result){}
        })
    }
});*/

let currentUserLogin = null;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'us',
    password: 'irina'
});
app.listen(3001, () => {
    console.log('Server started: http://localhost:3001');
})
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/material', (req, res) => {
    console.log("mat");
    res.render('addMaterial');
})
app.get('/index.html', (req, res) => {
    res.render('index');
})
const authRouter = require('./api/routes/auth');
const adminRouter = require('./api/routes/admin');
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
//АВТОРИЗАЦИЯ
/*app.get('/auth', jsonParser, (req, res) => {
    console.log("Зашел в автоизацию")
    let user = JSON.parse(req.headers.senddata);
    console.log("Зашел в автоизацию")
    let query = 'SELECT * FROM us.user where login = ?;'
    pool.query(query, [user.login], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            console.log("Пользователь не найден")
            res.sendStatus(403)
        }
        else {
            console.log("Пользователь найден")
            console.log(data)
            bcrypt.compare(user.pass, data[0].pass, (err, result) => {
                if (err) {
                    console.log("Auth failed: ")
                    
                } 
                if (result){
                    console.log("Они совпали!")
                    res.sendStatus(403)
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
                    }
                }
            })
            
        }
    });
})*/


//АДМИНИСТРАТОР
//Загрузка данных учетных записей
/*app.get('/admin', (req, res) => {
    let query = 'SELECT fio, email, login, gr, role, bday FROM us.user;'
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
})*/
//Добавление новой учетной записи
/*app.post('/admin', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'INSERT INTO us.user (fio, email, login, pass, gr, role, bday) VALUES (?, ?, ?, ?, ?, ?, ?);';
    if ((ans.group == '') && (ans.bday == '')) {
        query = 'INSERT INTO us.user (fio, email, login, pass, role) VALUES (?, ?, ?, ?, ?);';
        pool.query(query, [ans.fio, ans.email, ans.login, ans.password, ans.role], function (err, data) {
            if (err) return console.log(err);
            res.redirect('/admin');
        });
    } else
        if ((ans.group == '') && (ans.bday != '')) {
            query = 'INSERT INTO us.user (fio, email, login, pass, role, bday) VALUES (?, ?, ?, ?, ?, ?);';
            pool.query(query, [ans.fio, ans.email, ans.login, ans.password, ans.role, ans.bday], function (err, data) {
                if (err) return console.log(err);
                res.redirect('/admin');
            });
        } else
            if ((ans.group != '') && (ans.bday == '')) {
                query = 'INSERT INTO us.user (fio, email, login, pass, gr, role) VALUES (?, ?, ?, ?, ?, ?);';
                pool.query(query, [ans.fio, ans.email, ans.login, ans.password, ans.group, ans.role], function (err, data) {
                    if (err) return console.log(err);
                    res.redirect('/admin');
                });
            } else {
                pool.query(query, [ans.fio, ans.email, ans.login, ans.password, ans.group, ans.role, ans.bday], function (err, data) {
                    if (err) return console.log(err);
                    res.redirect('/admin');
                });
            }
})*/
//Удаление учетной записи
/*app.delete('/admin', jsonParser, (req, res) => {
    if (req.body) {

        query = 'DELETE FROM us.user WHERE login = ? AND id > 0;';
        pool.query(query, [req.body[0]], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            res.sendStatus(200);
            //res.redirect('/admin');
        });
    }
    else {
        res.sendStatus(400);
    }
})*/
//Изменение учетных записей
/*app.put('/admin', jsonParser, (req, res) => {

    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans.fio);
    let query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, gr = ?, role = ?, bday = ? WHERE login = ? AND id > 0;';
    if ((ans.group == '') && (ans.bday == '')) {
        query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, role = ? WHERE login = ? AND id > 0;';
        pool.query(query, [ans.fio, ans.email, ans.login, ans.role, ans.currentLogin], function (err, data) {
            if (err) return console.log(err);
            res.sendStatus(200);
        });
    } else
        if ((ans.group == '') && (ans.bday != '')) {
            query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, role = ?, bday = ? WHERE login = ? AND id > 0;';
            pool.query(query, [ans.fio, ans.email, ans.login, ans.role, ans.bday, ans.currentLogin], function (err, data) {
                if (err) return console.log(err);
                res.sendStatus(200);
            });
        } else
            if ((ans.group != '') && (ans.bday == '')) {
                query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, gr = ?, role = ? WHERE login = ? AND id > 0;';
                pool.query(query, [ans.fio, ans.email, ans.login, ans.group, ans.role, ans.currentLogin], function (err, data) {
                    if (err) return console.log(err);
                    res.sendStatus(200);
                });
            } else {
                pool.query(query, [ans.fio, ans.email, ans.login, ans.group, ans.role, ans.bday, ans.currentLogin], function (err, data) {
                    if (err) return console.log(err);
                    res.sendStatus(200);
                });
            }
})*/

//ПРЕПОДАВАТЕЛЬ

app.get('/teach', (req, res) => {
    let query = 'SELECT id, title, description FROM us.course;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            let infoClient = {};
            infoClient.courses = data;
            query = 'SELECT id, fio, gr FROM us.user WHERE role = 1';
            pool.query(query, function (err, data) {
                if (err) return console.log(err);
                if (data.length != 0) {
                    infoClient.students = data;
                    res.status = 200;
                    res.render('teac', { info: infoClient });
                }
            })
        }
        else res.sendStatus(403);
    })
})

app.get('/course-info', (req, res) => {
    let query = 'SELECT title, description FROM us.course WHERE id=?;'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })
})
app.put('/course', jsonParser, (req, res) => {
    console.log('put');
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans);
    let query = 'UPDATE us.course SET title = ?, description = ? WHERE id = ?;';
    pool.query(query, [ans.title, ans.description, ans.id], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });

})
//удаление курса
app.delete('/course', (req, res) => {
    if (req.headers.currentid) {
        query = 'DELETE FROM us.course WHERE id = ?;';
        pool.query(query, [req.headers.currentid], function (err, data) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(500);
    }
})

app.post('/course', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'INSERT INTO us.course (title, description) VALUES (?, ?);'
    pool.query(query, [ans.title, ans.description], function (err, data) {
        if (err) return console.log(err);
        res.redirect('/teach');
    });
})
app.get('/course/:courseID', urlencodedParser, (req, res) => {
    console.log("ge" + req.params['courseID']);
    res.render('teach');
})
app.get('/course', urlencodedParser, (req, res) => {
    console.log(req.query.courseID);
    if (!req.body) {
        return res.sendStatus(400);
    }
    /*let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id})
    });*/
    let query = `SELECT us.test.id AS t_id, us.test.title AS t_title, us.course.title AS c_title, us.course.description 
    AS c_desc, us.course.start_date AS c_start, us.course.end_date AS c_end, us.course.link, us.course.id AS c_id
     FROM us.test JOIN us.course_test ON us.test.id = us.course_test.test_id JOIN us.course ON us.course.id = 
     us.course_test.course_id WHERE course_id = ?;`;
    pool.query(query, [req.query.courseID], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            console.log("!data");
            query = 'SELECT * FROM us.course WHERE id = ?';
            pool.query(query, [req.query.courseID], function (err, data) {
                if (err) return console.log(err);
                res.render('course1', { title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id, t_id: null })
            })
        } else {
            console.log(data[0]);
            let t_title = [];
            let t_id = [];
            data.forEach(i => {
                t_id.push(i.t_id);
                t_title.push(i.t_title);
            })
            res.render('course1', {
                title: data[0].c_title, description: data[0].c_desc, link: data[0].link, id: data[0].c_id,
                t_title: t_title, t_id: t_id
            },
            )
        }

    })

    /*let query = 'SELECT title, description, link FROM us.course WHERE id=?;'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })
    query = 'SELECT title, description FROM us.test WHERE id = (SELECT test_id FROM us.course_test WHERE course_id = ?);'
    pool.query(query, req.headers.currentid, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            let Jdata = JSON.stringify(data);
            res.send(Jdata);
        }
        else res.sendStatus(403);
    })*/
    //res.render('course1',);
})

//Создание нового курса (название, описание, ссылка нулевая)
app.post('/teach-addcurse', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'INSERT INTO us.course (title, description) VALUES (?, ?);'
    pool.query(query, [ans.title, ans.description], function (err, data) {
        if (err) return console.log(err);
        res.render('addcurse', { title: ans.title, description: ans.description, currentId: data.insertId });
    });
})

app.get('/test/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.query.q);
    res.render('addcurse', { title: req.query.q, description: null });
    /*let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link})
    });*/
})

//Загрузка изображения TinyMCE
const fileUpload = require('express-fileupload');
const { hash } = require('bcrypt');
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
app.post('/teach-uploadimg', (req, res) => {
    const { imaage } = req.files;
    let result = req.files;
    result.file.mv(__dirname + '/public/upload/' + result.file.name);
    let ans = {
        'location': '/public/upload/' + result.file.name,
    }
    let jsonans = JSON.stringify(ans);
    res.send(jsonans);
});

//Найти курс по ИД
app.post('/teach-getcoursebyid', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let query = 'SELECT id FROM us.course WHERE title = ? ;'
    pool.query(query, [req.body], function (err, data) {
        if (err) return console.log(err);
        let id = data[0].id;
        res.send([id]);
    });
})
app.get('/add_test/', (req, res) => {
    console.log("i am here")
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.query.title);
    //res.render('add_test')
    let query = 'SELECT * FROM us.test WHERE title = ? ;'
    pool.query(query, [req.query.title], function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        //let id = data[0].id;
        res.render('add_test', { title: data[0].title });
    });
})
//Переход на страницу с информацией о курсе
app.get('/teach-showcurse', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    /*let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id})
    });*/
    console.log(req.query.titlecourse)
    let query = `SELECT us.test.id AS t_id, us.test.title AS t_title, us.course.title AS c_title, us.course.description 
    AS c_desc, us.course.start_date AS c_start, us.course.end_date AS c_end, us.course.link, us.course.id AS c_id
     FROM us.test JOIN us.course_test ON us.test.id = us.course_test.test_id JOIN us.course ON us.course.id = 
     us.course_test.course_id WHERE course_id =  (SELECT course.id FROM us.course WHERE us.course.title = ?);`;
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            console.log("!data");
            query = 'SELECT * FROM us.course WHERE title = ?';
            pool.query(query, [req.query.titlecourse], function (err, data) {
                if (err) return console.log(err);
                res.render('course', { title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id, t_id: null })
            })
        } else {
            console.log(data[0]);
            let t_title = [];
            let t_id = [];
            data.forEach(i => {
                t_id.push(i.t_id);
                t_title.push(i.t_title);
            })
            res.render('course', {
                title: data[0].c_title, description: data[0].c_desc, link: data[0].link, id: data[0].c_id,
                t_title: t_title, t_id: t_id
            },
            )
        }

    })

})
//Добавление материала к курсу
app.post('/teach-addmaterial', jsonParser, (req, res) => {
    console.log('teach-addmaterial');
    if (req.body) {
        let result = req.body;
        console.log(result);
        let path = __dirname + `/views/materials/${result.course}.ejs`;
        fs.writeFile(path, result.content, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            let link = `materials/${result.course}`;
            let query = 'UPDATE us.course SET link = ? WHERE id = ?;'
            pool.query(query, [link, result.course], function (err, data) {
                if (err) return console.log(err);
            });
            //файл записан успешно
        })
    }
    else {
        res.sendStatus(400);
    }
    res.sendStatus(200);
})
//Создание нового теста
app.post('/add_test', urlencodedParser, (req, res) => {
    if (!req.body) {
        console.log("пусто")
        return res.sendStatus(400);
    }
    let ans = req.body;
    if (ans.duration == "") {
        ans.duration = null;
    };
    if (ans.start == "") {
        ans.start = null;
    };
    if (ans.end == "") {
        ans.end = null;
    };
    console.log(req.body);
    let query = 'INSERT INTO us.test (title, description, start_date, end_date, duration) VALUES (?, ?, ?, ?, ?);'
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        console.log(data.insertId);
        query = 'INSERT INTO us.course_test (course_id, test_id) VALUES (?, ?);';
        pool.query(query, [ans.id, data.insertId], function (err, data) {
            if (err) return console.log(err);
        })

        res.render('add_test', { title: ans.title, description: ans.description });
    });
})
app.post('/add-question-one', jsonParser, (req, res) => {
    console.log("addddddddd")
    if (!req.body) {
        console.log("пусто")
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans);
    ans = JSON.parse(ans);
    console.log(ans.que);
    let title = ans.title;
    console.log(title);
    let question = JSON.stringify(ans.que);

    let query = 'INSERT INTO us.question (que, t_id) VALUES (?, ( SELECT id FROM us.test WHERE title = ?));'
    pool.query(query, [question, title], function (err, data) {
        if (err) return console.log(err);
        res.render('add_test', { title: ans.title, description: ans.description });
    });
    /*let query = 'INSERT INTO us.test (title, description, start_date, end_date, duration) VALUES (?, ?, ?, ?, ?);'
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        res.render('add_test', { title: ans.title, description: ans.description});
    });*/
    /*let query = 'INSERT INTO us.test (title, description, start_date, end_date, duration) VALUES (?, ?, ?, ?, ?);'
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        res.render('add_test', { title: ans.title, description: ans.description});
    });*/
})

//ОБУЧАЕМЫЙ
app.get('/user', (req, res) => {
    let query = 'SELECT id, fio, email, login, gr, bday FROM us.user;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            res.render('user', { courses: data });
        }
        else res.sendStatus(403);
    })
})

const poolModeling = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'models',
    password: 'irina'
});
app.get("/modeling_admin", (req, res) => {
    let query = 'SELECT * from models.printer';
    let infoToClient = {};
    poolModeling.query(query, function (err, printers) {
        if (err) return console.log(err);
        infoToClient.printers = printers;
        query = 'SELECT * FROM models.filament';
        poolModeling.query(query, function (err, filaments) {
            if (err) return console.log(err);
            infoToClient.filaments = filaments;
            query = 'SELECT * FROM models.component';
            poolModeling.query(query, function (err, components) {
                if (err) return console.log(err);
                infoToClient.components = components;
                query = 'SELECT * FROM models.model';
                poolModeling.query(query, function (err, models) {
                    if (err) return console.log(err);
                    infoToClient.models = models;
                    res.render('modeling_admin', { goods: infoToClient })
                })
            })
        })
    })
})
app.get('/modeling', (req, res) => {
    let query = 'SELECT id, title FROM models.filament;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            query = 'SELECT id, title FROM models.printer;';
            poolModeling.query(query, function (err, print) {
                if (err) return console.log(err);
                if (data.length != 0) {
                    let resInfo = { fil: data, pr: print };
                    res.status = 200;
                    res.render("modeling", { goods: resInfo });
                } else res.sendStatus(403);
            });
        } else res.sendStatus(403);
    });
})
app.get("/show-models", (request, response) => {
    let query = 'SELECT * FROM models.model;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        query = 'SELECT * FROM models.component;';
        poolModeling.query(query, function (err, print) {
            if (err) return console.log(err);
            let resInfo = { models: data, components: print };
            let JresInfo = JSON.stringify(resInfo);
            //console.log(JresInfo);
            // отправляем ответ
            response.send(JresInfo);
        });
    });
})
app.get("/printers-filaments", (request, response) => {
    let query = 'SELECT * FROM models.printer;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        query = 'SELECT * FROM models.filament;';
        poolModeling.query(query, function (err, filament) {
            if (err) return console.log(err);
            let resInfo = { printers: data, filaments: filament };
            let JresInfo = JSON.stringify(resInfo);
            //console.log(JresInfo);
            // отправляем ответ
            response.send(JresInfo);
        });
    });
})
app.post("/addPrinter", urlencodedParser, (request, response) => {
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
    let query = 'INSERT INTO models.printer (title, extruder_heating_temp, table_heating_temp, print_speed, power, size, materials) VALUES (?, ?, ?, ?, ?, ?, ?);';
    poolModeling.query(query, [ans.title, ans.extra, ans.table, ans.speed, ans.power, ans.size, ans.materials], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/admin');
    });
})
app.delete("/printer", jsonParser, (req, res) => {
    console.log("ffeerfe")
    console.log(req.body.myId)

    if (req.body) {

        query = 'DELETE FROM models.model WHERE printer_id = ?;';
        poolModeling.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            query = 'DELETE FROM models.printer WHERE id = ?;';
            poolModeling.query(query, [req.body.myId], function (err, data) {
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
app.put('/printer', jsonParser, (req, res) => {
    console.log("done")
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    console.log(ans.title);
    console.log(ans);

    let query = 'UPDATE models.printer SET title = ?, extruder_heating_temp = ?, table_heating_temp = ?, print_speed = ?, power = ?, size = ?, materials = ? WHERE id = ?;';
    poolModeling.query(query, [ans.title, ans.extra, ans.table, ans.speed, ans.power, ans.size, ans.materials, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})

app.post("/addFilament", urlencodedParser, (request, response) => {
    console.log(request.body.title);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO models.filament (title, melting_point, extrusion_temp, shrinkage, density, flexural_strength, tensile_strength, elasticity) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    poolModeling.query(query, [ans.title, ans.melting, ans.extra, ans.shrinkage, ans.density, ans.flexural_strength, ans.tensile_strength, ans.elasticity], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/admin');
    });
})
app.delete("/filament", jsonParser, (req, res) => {
    console.log("зашел")
    console.log(req.body.myId)
    if (req.body) {

        query = 'DELETE FROM models.model WHERE filament_id = ?;';
        poolModeling.query(query, [req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            query = 'DELETE FROM models.filament WHERE id = ?;';
            poolModeling.query(query, [req.body.myId], function (err, data) {
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
app.put('/filament', jsonParser, (req, res) => {
    console.log("done1")
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
    let query = 'UPDATE models.filament SET title = ?, melting_point = ?, extrusion_temp = ?, shrinkage = ?, density = ?, flexural_strength = ?, tensile_strength = ?, elasticity = ? WHERE id = ?;';
    poolModeling.query(query, [ans.title, ans.melting, ans.extra, ans.shrinkage, ans.density, ans.flexural_strength, ans.tensile_strength, ans.elasticity, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
app.post("/addComponent", urlencodedParser, (request, response) => {
    console.log(request.body);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    for (key in ans) {
        if (ans[key] == '') {
            ans[key] = null;
        }
    }
    let query = 'INSERT INTO models.component (title, designation, units, type, max) VALUES (?, ?, ?, ?, ?);';
    poolModeling.query(query, [ans.title, ans.designation, ans.units, ans.type, ans.max], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/admin');
    });
})
app.delete("/component", jsonParser, (req, res) => {

    if (req.body) {

        query = 'DELETE FROM models.model WHERE  (id > 0)  AND ( (firstFactor = ?) OR (secondFactor = ?) OR (response = ?) );';
        poolModeling.query(query, [req.body.myId, req.body.myId, req.body.myId], function (err, data) {
            if (err) {
                res.sendStatus(500);
                console.log("error");
                return console.log(err);
            }
            query = 'DELETE FROM models.component WHERE id = ?;';
            poolModeling.query(query, [req.body.myId], function (err, data) {
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
app.put('/component', jsonParser, (req, res) => {
    console.log("done2")
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
    let query = 'UPDATE models.component SET title = ?, designation = ?, units = ?, type = ?, max = ? WHERE id = ?;';
    poolModeling.query(query, [ans.title, ans.designation, ans.units, ans.type, ans.max, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})

app.delete("/model", jsonParser, (req, res) => {

    if (req.body) {

        query = 'DELETE FROM models.model WHERE  id = ?;';
        poolModeling.query(query, [req.body.myId], function (err, data) {
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
app.put('/model', jsonParser, (req, res) => {
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
    let query = 'UPDATE models.model SET title = ?, equation = ?, filament_id = ?, printer_id = ?, R2 = ?, F = ?, SD = ? WHERE id = ?;';
    poolModeling.query(query, [ans.title, ans.equation, ans.filament, ans.printer, ans.r2, ans.f, ans.sd, ans.current], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
})
app.post("/model", urlencodedParser, (request, response) => {
    console.log(request.body.title);
    if (!request.body) {
        return response.sendStatus(400);
    }
    let ans = request.body;
    let query = 'INSERT INTO models.model (title, equation, filament_id, printer_id, firstFactor, secondFactor, response, R2, F, SD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    poolModeling.query(query, [ans.title, ans.equation, ans.filament, ans.printer, ans.firstFactor, ans.secondFactor, ans.response, ans.r2, ans.f, ans.sd], function (err, data) {
        if (err) return console.log(err);
        response.redirect('/admin');
    });
})