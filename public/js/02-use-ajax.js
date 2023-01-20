"use strict";

/*
 * # AJAX 的使用
 *
 * - 可以为 xhr 对象绑定一个 load 事件
 * - `xhr.response`：表示响应信息
 * - `xhr.status`：表示响应状态码
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");
    const stuTable = document.getElementById("stu-table");

    btn.addEventListener("click", () => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json"; // 设置响应体的类型，设置后会自动对数据进行类型转换

        // 可以为 xhr 对象绑定一个 load 事件
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                // const res = JSON.parse(xhr.response);
                // console.log(res);

                const res = xhr.response;
                // console.log(res);

                if (res.status === "ok") {
                    const data = res.data;

                    for (let stu of data) {
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
            }
        });

        xhr.open("GET", "http://localhost:3000/students-api");
        xhr.send();
    });
});
