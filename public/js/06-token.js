"use strict";

/*
 * # token 简介
 *
 * - 现在是登录以后直接将用户信息存储到了 localStorage 中
 * - 主要存在两个问题
 *   1. 数据的安全问题
 *   2. 服务器不知道用户的登录状态
 * - 解决问题
 *   - 如何告诉服务器客户端的登录状态
 *     - REST 风格的服务器是无状态的服务器
 *     - 不要在服务器中存储用户的数据
 *     - 服务器中不能存储用户信息，可以将该用户信息发送给客户端保存
 *     - 客户端每次访问服务器时，直接将用户信息发回，服务器就可以根据用户信息来识别用户的身份
 *     - 但是如果将数据直接发送给客户端同样会有数据安全的问题
 *       - 所以必须对数据进行加密
 *       - 加密以后再发送给客户端保存，这样即可避免数据的泄漏
 * - 在 Node.js 中可以直接使用 `jsonwebtoken`（jwt）这个包来对数据进行加密
 *   - 通过对 JSON 加密后，生成一个 Web 中使用的令牌
 * - 使用步骤
 *   1. 安装：`yarn add jsonwebtoken`
 *   2. 引入：`const jwt = require("jsonwebtoken");`
 */
document.addEventListener("DOMContentLoaded", () => {
    function addLoginEventListener() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const loginBtn = document.getElementById("login-btn");

        loginBtn.addEventListener("click", () => {
            let username = usernameInput.value.trim();
            let password = passwordInput.value.trim();

            if (username.length !== 0 && password.length !== 0) {
                (async () => {
                    try {
                        const jsonRes = await (await fetch("http://localhost:3000/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username,
                                password,
                            }),
                        })).json();

                        if (jsonRes.status === "ok") {
                            localStorage.setItem("username", username);
                            localStorage.setItem("token", jsonRes.data.token);
                            localStorage.setItem("nickname", jsonRes.data.nickname);

                            renderHomePage();
                        } else {
                            alert(jsonRes.message);
                        }
                    } catch (e) {
                        alert("登录连接超时！");
                    }
                })();
            } else {
                alert("用户名或密码为空！");
            }
        });
    }

    function renderHomePage() {
        const homePageInnerHTML = `    <h1>欢迎 ${localStorage.getItem("nickname")}</h1>
    <br>
    <button id="btn1">点我加载数据</button>
    <button id="btn2">点我发送数据</button>
    <button id="logout-btn">登出</button>
    <hr>
    <hr>
    <table id="stu-table">
        <thead>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
            <th>住址</th>
        </tr>
        </thead>
    </table>`;
        const loginInnerHTML = `    <h1>登录</h1>
    <hr>
    <form id="login-form">
        <label for="username">用户名：</label>
        <input type="text" name="username" id="username">
        <br>
        <label for="password">密码：</label>
        <input type="password" name="password" id="password">
        <br>
        <input id="login-btn" type="button" value="登录">
    </form>`;

        const root = document.getElementById("root");
        root.innerHTML = homePageInnerHTML;

        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const logoutBtn = document.getElementById("logout-btn");
        const stuTable = document.getElementById("stu-table");

        btn1.addEventListener("click", (async () => {
            try {
                const jsonRes = await (await fetch("http://localhost:3000/students-api", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                })).json();

                if (jsonRes.status === "ok") {
                    for (let stu of jsonRes.data) {
                        const stuTr = document.createElement("tr");
                        const stuIdTd = document.createElement("td");
                        const stuNameTd = document.createElement("td");
                        const stuAgeTd = document.createElement("td");
                        const stuGenderTd = document.createElement("td");
                        const stuAddressTd = document.createElement("td");

                        stuIdTd.textContent = stu.id;
                        stuNameTd.textContent = stu.name;
                        stuAgeTd.textContent = stu.age;
                        stuGenderTd.textContent = stu.gender;
                        stuAddressTd.textContent = stu.address;

                        stuTr.appendChild(stuIdTd);
                        stuTr.appendChild(stuNameTd);
                        stuTr.appendChild(stuAgeTd);
                        stuTr.appendChild(stuGenderTd);
                        stuTr.appendChild(stuAddressTd);

                        stuTable.appendChild(stuTr);
                    }
                } else {
                    console.log(jsonRes.message);
                }
            } catch (e) {
                console.log("请求失败");
                console.log(e);
            }
        }));
        btn2.addEventListener("click", (async () => {
            try {
                const res = await fetch("http://localhost:3000/students-api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        name: "白骨精",
                        age: 16,
                        gender: "女",
                        address: "白骨洞",
                    }),
                });

                if (res.status !== 200) {
                    const jsonRes = await res.json();
                    console.log(jsonRes.message);
                }
            } catch (e) {
                console.log("请求失败");
                console.log(e);
            }
        }));
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            root.innerHTML = loginInnerHTML;
            addLoginEventListener();
        });
    }

    if (localStorage.getItem("username") != null) {
        renderHomePage();
    } else {
        addLoginEventListener();
    }
});
