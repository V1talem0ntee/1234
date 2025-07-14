// File: js/Register.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("password2");

    const usernameFeedback = document.getElementById("username-feedback");
    const passwordFeedback = document.getElementById("password-feedback");
    const confirmFeedback = document.getElementById("confirm-password-feedback");

    // 实时密码强度反馈
    passwordInput.addEventListener("input", () => {
        const pwd = passwordInput.value;
        const check = validatePassword(pwd);

        let messages = [];
        messages.push(check.minLength ? "✅ At least 8 characters" : "❌ At least 8 characters");
        messages.push(check.hasUpperCase ? "✅ At least one uppercase letter" : "❌ At least one uppercase letter");
        messages.push(check.hasNumber ? "✅ At least one number" : "❌ At least one number");
        messages.push(check.hasSpecialChar ? "✅ At least one special character (e.g. !@#$)" : "❌ A");


        passwordFeedback.innerHTML = messages.join("<br>");
        passwordFeedback.className = check.isValid ? "feedback valid" : "feedback invalid";
    });

    // 表单提交验证和跳转
    form.addEventListener("submit", function (e) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;

        let isValid = true;

        // 用户名验证
        if (!/^[a-zA-Z][a-zA-Z0-9]{2,}$/.test(username)) {
            usernameFeedback.textContent = "Only letter or number please";
            usernameFeedback.className = "feedback invalid";
            isValid = false;
        } else {
            usernameFeedback.textContent = "your good";
            usernameFeedback.className = "feedback valid";
        }

        // 密码验证
        const passwordCheck = validatePassword(password);
        if (!passwordCheck.isValid) {
            isValid = false;
        }

        // 密码验证
        if (confirmPassword !== password) {
            confirmFeedback.textContent = "Passwords do not match";
            confirmFeedback.className = "feedback invalid";
            isValid = false;
        } else {
            confirmFeedback.textContent = "密码匹配";
            confirmFeedback.className = "feedback valid";
        }

        // 根据验证结果决定是否跳转
        e.preventDefault(); // 阻止表单默认提交

        if (isValid) {
            //验证
            window.location.href = "index.html";
        }
    });

    // 密码检查函数
    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[\/\*\-\+!@#$^&~\[\]]/.test(password);

        return {
            isValid: minLength && hasUpperCase && hasNumber && hasSpecialChar,
            minLength,
            hasUpperCase,
            hasNumber,
            hasSpecialChar
        };
    }
});
