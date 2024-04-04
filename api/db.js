const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'us',
    password: 'irina'
});

module.exports = pool;