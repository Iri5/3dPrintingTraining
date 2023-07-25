const fs = require('fs');
const express = require('express')
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
const mysql = require('mysql2');
const { dirname } = require('path');
const bodyParser = require("body-parser");
app.use(bodyParser.text({ type: "application/json" }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'us',
    password: 'irina'
});
app.listen(3000, () => {
    console.log('Server started: http://localhost:3000');
})
app.set("view engine", "ejs");
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/index.html', (req, res) => {
    res.render('index');
})
app.get('/teac.html', (req, res) => {
    res.render('teac');
})
app.get('/admin.html', (req, res) => {
    let query = "SELECT fio, email, login, gr, role, bday FROM us.user;"
    pool.query(query,  function (err, data) {
        if (err) return console.log(err);
        
        let arrLogin = [];
        data.forEach((item, index) => {
            let date = item.bday;
            if(date != null){
                date = date.toISOString().split('T')[0];
                item.bday = date;
            }
            if(item.role == 1){
                item.role = "Обучаемый";
            } 
            else if (item.role == 2){
                item.role = "Преподаватель";
            }
            else if (item.role == 3){
                item.role = "Администратор";
            }
            
            arrLogin.push(item.login);
        });
        res.render('admin', {goods: data, logins: arrLogin});

    });
})
app.post('/auth', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    
    let query = "SELECT role FROM us.user where login = ? and pass = ?;"
    pool.query(query, [req.body.auth_login, req.body.auth_pass], function (err, data) {
        if (err) return console.log(err);
        
        if (data.length != 0) {
            if (data[0].role == 3) {
                res.redirect('/admin.html');
            } else if (data[0].role == 2) {
                res.render( 'teac');
            } else if (data[0].role == 1) {
                res.render('user');
            }
        }
        else {
            res.redirect("/")
        }

    });
})
app.post('/addpersone', urlencodedParser, (req, res) => {
    console.log("я тут");
    if (!req.body) {
        console.log("я тут");
        return res.sendStatus(400);
    }
    console.log(req.body);
    console.log(req.body.add_group);
    console.log(req.body.auth_login);
    
    let query = "INSERT INTO us.user (fio, email, login, pass, gr, role, bday) VALUES (?, ?, ?, ?, ?, ?, ?);"
    if( (req.body.add_group == '') && (req.body.add_bday == '')){
        query = "INSERT INTO us.user (fio, email, login, pass, role) VALUES (?, ?, ?, ?, ?);"
        pool.query(query, [req.body.add_fio, req.body.add_email, req.body.add_login, req.body.add_password, req.body.add_role], function (err, data) {
            if (err) return console.log(err);

            console.log(data);
            res.redirect('/admin.html');
        });
    } else
    if ( (req.body.add_group == '') && (req.body.add_bday != '')){
        query = "INSERT INTO us.user (fio, email, login, pass, role, bday) VALUES (?, ?, ?, ?, ?, ?);";
        pool.query(query, [req.body.add_fio, req.body.add_email, req.body.add_login, req.body.add_password, req.body.add_role, req.body.add_bday], function (err, data) {
            if (err) return console.log(err);
            console.log(data);
            res.redirect('/admin.html');
        });
    } else
    if ( (req.body.add_group != '') && (req.body.add_bday == '')){
        console.log("xdfcgjnkj hgfdghkljh")
        query = "INSERT INTO us.user (fio, email, login, pass, gr, role) VALUES (?, ?, ?, ?, ?, ?);";
        pool.query(query, [req.body.add_fio, req.body.add_email, req.body.add_login, req.body.add_password, req.body.add_group, req.body.add_role], function (err, data) {
            if (err) return console.log(err);
            console.log(data);
            res.redirect('/admin.html');
        });
    } else {
        pool.query(query, [req.body.add_fio, req.body.add_email, req.body.add_login, req.body.add_password, req.body.add_group, req.body.add_role, req.body.add_bday], function (err, data) {
            if (err) return console.log(err);
            console.log(data);
            res.redirect('/admin.html');
        });
    }
    
})
//vet
app.get('/chart', (req, res) => {
    let query = "select  section.sec_title, count(*) as c from click join services on click.ser_id = services.id join section on section.id = services.sec_id group by sec_title";
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
})

app.get('/data', (req, res) => {
    let query = "SELECT * FROM vetbd.services join section where services.sec_id = section.id;";
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
})

app.post('/click', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    let ser_title = req.body.section;
    let time = req.body.time * 0.001;
    let query = `INSERT INTO vetbd.click (ser_id, dat) VALUES ((SELECT id FROM vetbd.services where ser_title = ?), (FROM_UNIXTIME (?) ))`;
    pool.query(query, [ser_title, time], function (err, data) {
        if (err) return console.log(err);
        console.log(data);
        res.send(data);
    });
})

app.post('/password', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let file = fs.readFileSync("pass.json");
    file = JSON.parse(file);

    if (file.password == req.body.pass) {
        res.send([1]);
    } else res.send([0]);
})




//////////////////////////////////
const fileUpload = require('express-fileupload');

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.post('/teac', (req, res) => {
    console.log("file");
    let result
    if (req.body) {
        result = req.body;
    }
    else {
        res.sendStatus(400);
    }
    const file = fs.createWriteStream("file.json");
    let b = " " + req.body + " ";
    let path = __dirname + '/test.txt';
    fs.writeFile(path, b, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //файл записан успешно
    })
    res.sendStatus(200);
})

app.post('/curse', urlencodedParser, (req, res) => {
    console.log("file");
    const file = fs.createWriteStream("file.json");
    console.log("dsdsvd");
    console.log(req.body);
    let b = " " + req.body + " ";
    let path = __dirname + '/test.txt' ;
    fs.writeFile(path, b, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //файл записан успешно
    })

})
app.post('/upload', (req, res) => {
    console.log("here");
    // Get the file that was set to our field named "image"
    const { imaage } = req.files;
    console.log(req.files);
    // If no image submitted, exit
    //if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    // if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    console.log("img");
    console.log(req.files.file);
    req.files.file.mv(__dirname + '/upload/' + req.files.file.name);
    let ans = {
        "location": "../upload/" + req.files.file.name,
    }
    let json1 = JSON.stringify(ans);

    // All good
    //res.sendStatus(200);
    res.location = "../upload/" + req.files.file.name;
});