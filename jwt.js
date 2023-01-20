const jwt = require("jsonwebtoken"); // 引入 jwt 包

const obj = {
    username: "icekylin",
    age: 20,
    gender: "女",
}; // 创建一个对象

const token = jwt.sign(obj, "Hello", {
    expiresIn: "1h", // 过期时间
}); // 使用 jwt 来对 JSON 数据进行加密
console.log(token);
console.log(typeof token);

console.log("\n");

try {
    const decodeData = jwt.verify(token, "Hello");
    console.log(decodeData);
    console.log(typeof decodeData);
} catch (e) {
    // 说明 token 解码失败
    console.log("无效的 token");
}
