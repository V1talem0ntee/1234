const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home", script: "index.js" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", script: "Register.js" });
});

router.get("/postvideo", (req, res) => {
  res.render("postvideo", { title: "Post Video" });
});

router.get("/viewpost", (req, res) => {
  res.render("viewpost", { title: "View Video" });
});

module.exports = router;
