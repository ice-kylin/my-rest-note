"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = require("../index.js").SECRET;

const STUDENTS = [
    {id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山"},
    {id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄"},
    {id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河"},
];

function auth(req, res, cb) {
    try {
        if (jwt
            .verify(
                req
                    .get("Authorization")
                    .split(" ")
                    .at(-1),
                SECRET,
            ).username === "admin") {
            cb();
        } else {
            res.status(403).send({
                status: "error",
                message: "没有权限",
            });
        }
    } catch (e) {
        res.status(401).send({
            status: "error",
            message: "未登录",
        });
    }
}

// 查询所有学生
router.get("/", (req, res) => {
    auth(req, res, () => {
        res.send({
            status: "ok",
            data: STUDENTS,
        });
    });
});

// 查询某个学生
router.get("/:id", (req, res) => {
    auth(req, res, () => {
        const id = req.params.id;
        const stu = STUDENTS.find(s => s.id === id);

        if (stu !== undefined) {
            res.send({
                status: "ok",
                data: stu,
            });
        } else {
            res.send({
                status: "error",
                message: `id 不存在`,
            });
        }
    });
});

// 添加学生信息
router.post("/", (req, res) => {
    auth(req, res, () => {
        const {name, age, gender, address} = req.body;
        const id = (+STUDENTS.at(-1).id) + 1 + "";

        let stu = {
            id,
            name,
            age,
            gender,
            address,
        };
        STUDENTS.push(stu);

        res.send({
            status: "ok",
            data: stu,
        });
    });
});

// 删除学生信息
router.delete("/:id", (req, res) => {
    auth(req, res, () => {
        const id = req.params.id;

        let index = STUDENTS.findIndex(student => student.id === id);
        if (index !== -1) {
            res.send({
                status: "ok",
                data: STUDENTS.splice(
                    index,
                    1,
                )[0],
            });
        } else {
            res.status(406).send({
                status: "error",
                message: "id 不存在",
            });
        }
    });
});

// 修改学生信息
router.put("/", (req, res) => {
    auth(req, res, () => {
        const {id, name, age, gender, address} = req.body;

        const updateStu = STUDENTS.find(student => student.id === id);

        if (updateStu !== undefined) {
            updateStu.name = name;
            updateStu.age = age;
            updateStu.gender = gender;
            updateStu.address = address;

            res.send({
                status: "ok",
                data: updateStu,
            });
        } else {
            res.status(406).send({
                status: "error",
                message: "id 不存在",
            });
        }
    });
});

module.exports = router;
