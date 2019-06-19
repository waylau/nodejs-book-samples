const redis = require("redis");

// 创建客户端
const client = redis.createClient();

// 错误处理
client.on("error", function (err) {
    console.log("Error " + err);
});

// 设值
client.set("书名", "《Node.js企业级应用开发实战》", redis.print);

// 同个key不同的字段
client.hset("柳伟卫的Spring三剑客", "第一剑", "《Spring Boot 企业级应用开发实战》", redis.print);
client.hset("柳伟卫的Spring三剑客", "第二剑", "《Spring Cloud 微服务架构开发实战》", redis.print);
client.hset(["柳伟卫的Spring三剑客", "第三剑", "《Spring 5 开发大全》"], redis.print);

// 返回所有的字段
client.hkeys("柳伟卫的Spring三剑客", function (err, replies) {
    console.log("柳伟卫的Spring三剑客共" + replies.length + "本:");
    
    // 遍历所有的字段
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
});

// 获取key所对应的值
client.get("书名", function (err, reply) {
    console.log(reply); 
});


// 获取key所对应的值
client.hgetall("柳伟卫的Spring三剑客", function (err, reply) {
    console.log(reply); 

    // 退出
    client.quit();
});