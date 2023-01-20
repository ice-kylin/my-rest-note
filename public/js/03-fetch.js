"use strict";

/*
 * # Fetch
 *
 * - Fetch 是 xhr 的升级版，采用的是 Promise API
 * - 作用和 AJAX 是一样的，但是使用起来更加友好
 * - Fetch 原生 JS 就支持的一种 AJAX 请求的方式
 * - `rst.json()`：可以用来读取一个 JSON 格式的数据
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const stuTable = document.getElementById("stu-table");

    // fetch("http://localhost:3000/students-api").then(res => {
    //     if (res.status === 200) {
    //         return res.json();
    //     } else {
    //         throw new Error("请求失败");
    //     }
    // }).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });

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
});
