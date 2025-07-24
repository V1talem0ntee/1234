const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../Confi/db.js");

// 注册
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Please fill in all fields.");
  }

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).send("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.promise().query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

// 登录

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(400).send("Invalid credentials.");
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials.");
    }

    // 保存用户 session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/"); // 登录成功后跳转主页
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});


// 登出
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Logout failed:", err);
      return res.redirect("/"); // 如果失败，就先返回首页
    }

    // 清除 cookie（可选，确保完全登出）
    res.clearCookie("connect.sid");
    res.redirect("/login"); // 成功后跳转
  });
});

module.exports = router;
