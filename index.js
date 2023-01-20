"use strict";

const path = require("node:path");
const express = require("express");
const apiApp = express();
const staticApp = express();

exports.SECRET = "Hello";

{
    apiApp.use(express.json()); // 解析 JSON 格式的请求体的中间件
    apiApp.use((req, res, next) => {
        // res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500"); // 设置指定值时，只能设置一个
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");

        next();
    });
}

apiApp.use("/login", require("./routes/login.js"));
apiApp.use("/students-api", require("./routes/students.js"));
apiApp.listen(3000, () => {
    console.log("http://localhost:3000");
});

apiApp.get("/test", () => {
});

staticApp.use(express.static(path.resolve(__dirname, "public")));
staticApp.listen(5500, () => {
    console.log("http://localhost:5500");
});
