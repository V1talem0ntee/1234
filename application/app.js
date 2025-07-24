const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const session = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express(); // ✅ 必须先定义 app，再开始使用 app.use()

// 🔐 启用 Session（必须在 app 定义之后）
app.use(session({
    secret: "my-secret-key", // 可自定义
    resave: false,
    saveUninitialized: true
}));

// 设置 handlebars 作为视图引擎
app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "layout",
        helpers: {},
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// 中间件
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

// 🧠 每个请求都设置 res.locals.user，供 hbs 模板使用
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


// 路由
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 处理 404 错误
app.use((req, res, next) => {
    next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
});

// 错误处理
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = err;
    console.log(err);
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

