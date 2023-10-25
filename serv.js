const fs = require('fs');
const express = require('express')
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
const mysql = require('mysql2');
const { dirname } = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'us',
    password: 'irina'
});
app.listen(3000, () => {
    console.log('Server started: http://localhost:3000');
})
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/index.html', (req, res) => {
    res.render('index');
})

//АВТОРИЗАЦИЯ
app.get('/auth', jsonParser, (req, res) => {
    let user = JSON.parse(req.headers.senddata);
    let query = 'SELECT role FROM us.user where login = ? and pass = ?;'
    pool.query(query, [user.login, user.pass], function (err, data) {
        if (err) return console.log(err);
        if (data.length == 0) {
            res.sendStatus(403)
        }
        else {
            switch (data[0].role) {
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
                    res.status = 200;
                    res.render('user');
                    break;
            }
        }
    });
})


//АДМИНИСТРАТОР
//Загрузка данных учетных записей
app.get('/admin', (req, res) => {
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
})
//Добавление новой учетной записи
app.post('/admin', urlencodedParser, (req, res) => {
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
})
//Удаление учетной записи
app.delete('/admin', jsonParser, (req, res) => {
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
})
//Изменение учетных записей
app.put('/admin', jsonParser, (req, res) => {

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
})

//ПРЕПОДАВАТЕЛЬ

app.get('/teach', (req, res) => {
    let query = 'SELECT id, title, description FROM us.course;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            res.render('teac',{ courses: data });
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
app.get('/course',urlencodedParser, (req, res) =>{
    console.log(req.query.courseID);
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
    res.render('course1',);
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
    if (req.body) {
        let result = req.body;
        result = JSON.parse(result);
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
