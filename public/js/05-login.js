"use strict";

/*
 * # 登录
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
                        const jsonRes = await (await fetch("http://127.0.0.1:3000/login", {
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
                const res = await fetch("http://localhost:3000/students-api");
                if (res.status === 200) {
                    const jsonRes = await res.json();

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
                    }
                } else {
                    console.log("请求失败");
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
                        "Content-Type": "application/json", // application/x-www-form-urlencoded
                    },
                    body: JSON.stringify({
                        name: "白骨精",
                        age: 16,
                        gender: "女",
                        address: "白骨洞",
                    }),
                });

                if (res.status === 200) {
                    const jsonRes = await res.json();
                    console.log(jsonRes);
                } else {
                    console.log("请求失败");
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
