const fs = require('fs');
const express = require('express')
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
const mysql = require('mysql2');
const { dirname } = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'application/json' }));

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

//авторизация
app.post('/auth', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let query = 'SELECT role FROM us.user where login = ? and pass = ?;'
    pool.query(query, [req.body.auth_login, req.body.auth_pass], function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            if (data[0].role == 3) {
                res.redirect('/admin');
            } else if (data[0].role == 2) {
                query = 'SELECT title FROM us.course;'
                pool.query(query, function (err, data) {
                    if (err) return console.log(err);
                    console.log(data);
                    if (data.length != 0) {
                        res.render('teac', { courses: data });
                    }
                    else {
                        res.redirect('/')
                    }
                });
            } else if (data[0].role == 1) {
                res.render('user');
            }
        }
        else {
            res.redirect('/')
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
        res.render('admin', { goods: data, logins: logins });
    });
})
//Добавление новой учетной записи
app.post('/admin-addpersone', urlencodedParser, (req, res) => {
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
app.post('/admin-delete', (req, res) => {
    if (req.body) {
        let ans = req.body;
        query = 'DELETE FROM us.user WHERE login = ? AND id > 0;';
        pool.query(query, [ans], function (err, data) {
            if (err) return console.log(err);
            res.redirect('/admin');
        });
    }
    else {
        res.sendStatus(400);
    }
})
//Изменение учетных записей
app.post('/admin-editpersone', urlencodedParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    let ans = req.body;
    let query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, gr = ?, role = ?, bday = ? WHERE login = ? AND id > 0;';
    if ((ans.group == '') && (ans.bday == '')) {
        query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, role = ? WHERE login = ? AND id > 0;';
        pool.query(query, [ans.fio, ans.email, ans.login, ans.role, ans.current], function (err, data) {
            if (err) return console.log(err);
            res.redirect('/admin');
        });
    } else
        if ((ans.group == '') && (ans.bday != '')) {
            query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, role = ?, bday = ? WHERE login = ? AND id > 0;';
            pool.query(query, [ans.fio, ans.email, ans.login, ans.role, ans.bday, ans.current], function (err, data) {
                if (err) return console.log(err);
                res.redirect('/admin');
            });
        } else
            if ((ans.group != '') && (ans.bday == '')) {
                query = 'UPDATE us.user SET fio = ?, email = ?, login = ?, gr = ?, role = ? WHERE login = ? AND id > 0;';
                pool.query(query, [ans.fio, ans.email, ans.login, ans.group, ans.role, ans.current], function (err, data) {
                    if (err) return console.log(err);
                    res.redirect('/admin');
                });
            } else {
                pool.query(query, [ans.fio, ans.email, ans.login, ans.group, ans.role, ans.bday, ans.current], function (err, data) {
                    if (err) return console.log(err);
                    res.redirect('/admin');
                });
            }
})

//ПРЕПОДАВАТЕЛЬ
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

app.get('/test/', (req, res) =>{
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.query.q);
    res.render('addcurse', { title: req.query.q, description: null});
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
//Переход на страницу с информацией о курсе
app.get('/teach-showcurse', (req, res) =>{
    if (!req.body) {
        return res.sendStatus(400);
    }
    let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link})
    });
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
    if(ans.duration == ""){
        ans.duration = null;
    };
    if(ans.start == ""){
        ans.start = null;
    };
    if(ans.end == ""){
        ans.end = null;
    };
    console.log(req.body);
    let query = 'INSERT INTO us.test (title, description, start_date, end_date, duration) VALUES (?, ?, ?, ?, ?);'
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        res.render('add_test', { title: ans.title, description: ans.description});
    });
})
app.post('/add-question-one', jsonParser, (req, res) => {
    if (!req.body) {
        console.log("пусто")
        return res.sendStatus(400);
    }
    let ans = req.body;
    ans = JSON.parse(ans);
    console.log(ans.type);
    /*let query = 'INSERT INTO us.test (title, description, start_date, end_date, duration) VALUES (?, ?, ?, ?, ?);'
    pool.query(query, [ans.title, ans.description, ans.start, ans.end, ans.duration], function (err, data) {
        if (err) return console.log(err);
        res.render('add_test', { title: ans.title, description: ans.description});
    });*/
})
