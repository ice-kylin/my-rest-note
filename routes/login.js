"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = require("../index.js").SECRET;

router.post("/", (req, res) => {
    const {username, password} = req.body;

    if (username === "admin" && password === "123456") {
        res.send({
            status: "ok",
            message: "登录成功",
            data: {
                token: jwt.sign(
                    {
                        username,
                    },
                    SECRET,
                    {
                        expiresIn: "14d",
                    }),
                nickname: "松坂砂糖",
            },
        });
    } else {
        res.status(403).send({
            status: "error",
            message: "用户名或密码错误",
        });
    }
});

module.exports = router;
