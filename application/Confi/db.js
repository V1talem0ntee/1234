const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "021211", // 如果你设置了密码，请写上
    database: "video_app"
});

module.exports = db;
