const redis = require("redis");

// 创建客户端
const client = redis.createClient({
    // 连接配置，提供Redis密码、IP、端口
    url: 'redis://:password@192.168.1.77:6387'
  });

// 错误处理
client.on('error', err => console.log('Redis Client Error', err));

async function main() {
    await client.connect();

    // 设值
    await client.set("书名", "《Node.js企业级应用开发实战》");

    // 获取key所对应的值
    const bookName = await client.get("书名");
    console.log(bookName); 
    
 
    // 同个key不同的字段
    await client.hSet("柳伟卫的Spring三剑客", "第一剑", "《Spring Boot 企业级应用开发实战》" );
    await client.hSet("柳伟卫的Spring三剑客", "第二剑", "《Spring Cloud 微服务架构开发实战》" );
    await client.hSet("柳伟卫的Spring三剑客", "第三剑", "《Spring 5 开发大全》");
    
    // 返回所有的字段
    const replies = await client.hKeys("柳伟卫的Spring三剑客");
    console.log("柳伟卫的Spring三剑客共" + replies.length + "本:");
    // 遍历所有的字段
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });

    // 获取key所对应的值
    let allBooks = await client.hGetAll("柳伟卫的Spring三剑客");
    console.log("柳伟卫的Spring三剑客", JSON.stringify(allBooks));
 
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.disconnect());
