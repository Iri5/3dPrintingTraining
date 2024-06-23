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

// this comment made by me

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
    console.log('Path: / will render file index');
    res.render('index');
})
app.get('/material', (req, res) => {
    console.log('Path: /material will render file addMaterial.ejs');
    res.render('addMaterial');
})
app.get('/putmat/:link', (req, res) => {
    let link = req.params.link;
    console.log(link);
    let path = `materials/${link}`
    console.log('Path: /material will render file addMaterial.ejs');
    res.render('putMaterial', { link: path });
})
app.get('/index.html', (req, res) => {
    console.log('Path: /index.html will render file index.ejs');
    res.render('index');
})
const authRouter = require('./api/routes/auth');
const adminRouter = require('./api/routes/admin');
const teacherRouter = require('./api/routes/teacher/teacher');
const courseRouter = require('./api/routes/course');
const detailCourseRouter = require('./api/routes/detailcourse');
const printerRouter = require('./api/routes/printer');
const filamentRouter = require('./api/routes/filament');
const componentRouter = require('./api/routes/component');
const modelRouter = require('./api/routes/model');
const testRouter = require('./api/routes/test');
const questionRouter = require('./api/routes/question');
const tasksRouter = require('./api/routes/tasks');
const taskRouter = require('./api/routes/task');
const previewRouter = require('./api/routes/preview');
const studentRouter = require('./api/routes/student');
const userRouter = require('./api/routes/user');
const educationRouter = require('./api/routes/education');
const studyRouter = require('./api/routes/study');
const completeTestRouter = require('./api/routes/complete-test');
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/teach', teacherRouter);
app.use('/course', courseRouter);
app.use('/detailcourse', detailCourseRouter);
app.use('/printer', printerRouter);
app.use('/filament', filamentRouter);
app.use('/component', componentRouter);
app.use('/model', modelRouter);
app.use('/test', testRouter);
app.use('/question', questionRouter);
app.use('/tasks', tasksRouter);
app.use('/task', taskRouter);
app.use('/preview', previewRouter);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/education', educationRouter);
app.use('/study', studyRouter);
app.use('/complete-test', completeTestRouter);



app.get('/course/:courseID', urlencodedParser, (req, res) => {
    console.log('Path: /course/:courseID will render file teach.ejs');
    console.log("ge" + req.params['courseID']);
    res.render('teach');
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
app.post('/pract_score_new', urlencodedParser, (req, res) => {
    console.log('Path: /pract_score_new')
    console.log(req.body);
    let query = 'UPDATE mydb.education SET education.pract_score = ? WHERE education.id = ?';
    pool.query(query, [req.body.practic_score, req.body.id], function (err, data) {
        if (err) console.log(err);
        res.status = 200;
        res.redirect(`/student/${req.body.studid}`);
        ///student/:studid
    })
})
//Найти курс по ИД
/*app.post('/teach-getcoursebyid', urlencodedParser, (req, res) => {
    console.log('Path: /teach-getcoursebyid will send id FROM us.course WHERE title = ?');
    if (!req.body) {
        return res.sendStatus(400);
    }
    let query = 'SELECT id FROM us.course WHERE title = ? ;'
    pool.query(query, [req.body], function (err, data) {
        if (err) return console.log(err);
        let id = data[0].id;
        res.send([id]);
    });
})*/
/*app.get('/add_test/', (req, res) => {
    console.log('Path: /add_test/ will render add_test.ejs');
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
})*/
//Переход на страницу с информацией о курсе
/*
app.get('/teach-showcurse', (req, res) => {
    console.log('Path: /teach-showcurse will render course.ejs');

    if (!req.body) {
        return res.sendStatus(400);
    }*/
    /*let query = 'SELECT * FROM us.course WHERE title = ? ;'
    pool.query(query, [req.query.titlecourse], function (err, data) {
        if (err) return console.log(err);
        res.render('course', {title: data[0].title, description: data[0].description, link: data[0].link, id: data[0].id})
    });*/
    /*console.log(req.query.titlecourse)
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

})*/
//Добавление материала к курсу
app.post('/teach-addmaterial', jsonParser, (req, res) => {
    console.log('Path: /teach-addmaterial will create material file');
    if (req.body) {
        let result = req.body;
        console.log(result);
        let path = __dirname + `/views/materials/${result.course}.ejs`;
        fs.writeFile(path, result.content, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            let link = `${result.course}.ejs`;
            let query = 'INSERT INTO mydb.material (type, link, course_id) VALUES (?, ?, ?) ;'
            pool.query(query, ['HTML', link, result.course], function (err, data) {
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
app.post('/teach-addmaterial-update', jsonParser, (req, res) => {
    console.log('Path: /teach-addmaterial-update will create material file');
    if (req.body) {
        let result = req.body;
        console.log(result);
        let path = __dirname + `/views/materials/${result.course}.ejs`;
        fs.writeFile(path, result.content, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            let link = `${result.course}.ejs`;
            let query = 'UPDATE  mydb.material SET  link = ? WHERE course_id = ?;'
            //let query = 'INSERT INTO mydb.material (type, link, course_id) VALUES (?, ?, ?) ;'
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
app.get('/delmat/:id', jsonParser, (req, res) => {
    console.log('Path: //delmat/:id ');
    let id = req.params.id;


    let query = 'DELETE FROM  mydb.material  WHERE course_id = ?;'
    //let query = 'INSERT INTO mydb.material (type, link, course_id) VALUES (?, ?, ?) ;'
    pool.query(query, [id], function (err, data) {
        if (err) return console.log(err);
        res.sendStatus(200);
    });
    //файл записан успешно



    
})
//Создание нового теста
/*
app.post('/add_test', urlencodedParser, (req, res) => {
    console.log('Path: /add_test');
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
})*/
/*
app.post('/add-question-one', jsonParser, (req, res) => {
    console.log('Path: /add-question-one');

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
    });*/
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
/*})*/

//ОБУЧАЕМЫЙ
/*app.get('/user', (req, res) => {
    console.log('Path: /user');
    let query = 'SELECT id, fio, email, login, gr, bday FROM us.user;'
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            res.status = 200;
            res.render('user', { courses: data });
        }
        else res.sendStatus(403);
    })
})*/

const poolModeling = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'mydb',
    password: 'irina'
});
app.get("/modeling_admin", (req, res) => {
    let query = 'SELECT * from mydb.printer';
    let infoToClient = {};
    poolModeling.query(query, function (err, printers) {
        if (err) return console.log(err);
        infoToClient.printers = printers;
        query = 'SELECT * FROM mydb.filament';
        poolModeling.query(query, function (err, filaments) {
            if (err) return console.log(err);
            infoToClient.filaments = filaments;
            query = 'SELECT * FROM mydb.component';
            poolModeling.query(query, function (err, components) {
                if (err) return console.log(err);
                infoToClient.components = components;
                query = 'SELECT * FROM mydb.model';
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
    let query = 'SELECT id, title FROM mydb.filament;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        if (data.length != 0) {
            query = 'SELECT id, title FROM mydb.printer;';
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
    let query = 'SELECT * FROM mydb.model;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        query = 'SELECT * FROM mydb.component;';
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
    let query = 'SELECT * FROM mydb.printer;'
    poolModeling.query(query, function (err, data) {
        if (err) return console.log(err);
        query = 'SELECT * FROM mydb.filament;';
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

app.put("/practical_answer", (req, res) => {
    console.log('Path: /practical_answer Method: PUT')
    let ans = req.body;
    console.log('protocol');
    console.log(ans.protocol);
    console.log(ans)
    if (!req.body) {
        return response.sendStatus(400);
    }
    let prAns = {
        firstfactor: ans.firstfactor,
        secondfactor: ans.secondfactor
    }
    let prAnsJson = JSON.stringify(prAns)
    console.log(prAns)
    let protocolJSON = JSON.stringify(ans.protocol);
    let taskId = ans.taskId;
    let answerId = ans.answerId;
    let educationId = ans.educationId;
    let query = 'UPDATE mydb.practical_answer SET answer = ?, protocol = ? WHERE id = ?';
    let queryTask = 'SELECT * FROM mydb.practical_task WHERE id = ?';
    let queryEducation = 'UPDATE mydb.education SET pract_score = ? WHERE id = ?';
    pool.query(query, [prAnsJson, protocolJSON, answerId], function (err, data) {
        if (err) return console.log(err);
    })
    pool.query(queryTask, [taskId], function (err, data) {
        if (err) return console.log(err);
        console.log(data[0].answers);
        let right = data[0].answers;
        let score = 0;
        if ((prAns.firstfactor >= right.firstfactor.min) && (prAns.firstfactor <= right.firstfactor.max)
            && (prAns.secondfactor >= right.secondfactor.min) && (prAns.secondfactor <= right.secondfactor.max)) {
            score = 1;
        }
        pool.query(queryEducation, [score, educationId], function (err, data) {
            if (err) return console.log(err);
            res.sendStatus(200);
        })
    });

})