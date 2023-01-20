"use strict";

/*
 * # AJAX
 *
 * - 在 JS 中，向服务器发送请求加载数据的技术叫 AJAX
 * - AJAX 是 Asynchronous JavaScript and XML 的缩写
 *   - 异步的 JS 和 XML
 *   - xml 是早期 AJAX 使用的数据格式
 * - 它的作用就是通过 JS 向服务器发送请求，然后服务器返回数据，JS 通过回调函数处理数据
 * - 可以选择的方案
 *   1. XMLHttpRequest（xhr）
 *   2. Fetch
 *   3. Axios
 * - CORS（跨域资源共享）
 *   - 跨域请求
 *     - 如果两个网址的完整域名不相同，那么就是跨域请求
 *     - 跨域需要检查三个东西
 *       1. 协议
 *       2. 域名
 *       3. 端口
 *     - 这三个只要有一个不同，就算跨域
 *    - 当通过 AJAX 去发送跨域请求时
 *      - 浏览器为了服务器的安全，会阻止 JS 读取到服务器返回的数据
 *    - 解决方案
 *      - 在服务器中设置一个响应头，允许跨域请求
 *        - `Access-Control-Allow-Origin`：允许跨域请求的域名
 */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");

    // 点击按钮后就自动去加载服务器的数据
    btn.addEventListener("click", () => {
        // 创建新的 xhr 对象
        const xhr = new XMLHttpRequest();

        // 设置请求的信息（方法和地址）
        xhr.open("GET", "http://localhost:3000/students-api");

        // 发送请求
        xhr.send();
    });
});
