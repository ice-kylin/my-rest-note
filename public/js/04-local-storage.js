"use strict";

/*
 * # 本地存储
 *
 * - 登录成功以后，需要保持用户的登录状态，需要将用户的信息存储到某个地方
 * - 需要将用户信息存储到本地存储中
 * - 本地存储就是指浏览器自身的存储空间
 *   - 可以将用户的数据存储到浏览器内部
 *   - sessionStorage：存储的数据，页面一关闭就会丢失
 *   - localStorage：存储的时间比较长
 * - `setItem()`：用来存储数据
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    btn1.addEventListener("click", () => {
        sessionStorage.setItem("name", "松坂砂糖");
        sessionStorage.setItem("age", "18");
        sessionStorage.setItem("gender", "女");
    });
    btn2.addEventListener("click", () => {
        const name = sessionStorage.getItem("name");
        const age = sessionStorage.getItem("age");
        const gender = sessionStorage.getItem("gender");

        console.log(name, age, gender);
    });
    btn3.addEventListener("click", () => {
        sessionStorage.removeItem("name");
    });
    btn4.addEventListener("click", () => {
        sessionStorage.clear();
    });
});
