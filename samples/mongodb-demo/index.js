const MongoClient = require('mongodb').MongoClient;

// 连接URL
const url = 'mongodb://localhost:27017';

// 数据库名称
const dbName = 'nodejsBook';

// 创建MongoClient客户端
const client = new MongoClient(url);


async function main() {
    // 使用连接方法来连接到服务器
    await client.connect();
    console.log("成功连接到服务器");
    const db = client.db(dbName);

    // 获取集合
    const book = db.collection('book');

    // 插入多个文档
    const insertResult = await book.insertMany([
        { title: "Spring Boot 企业级应用开发实战", price: 98, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "Spring Cloud 微服务架构开发实战", price: 79, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "Spring 5 案例大全", price: 119, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "分布式系统开发实战", price: 69.8, press: "人民邮电出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "Java核心编程", price: 89, press: "清华大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "轻量级Java EE企业应用开发实战", price: 139, press: "清华大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "鸿蒙HarmonyOS应用开发入门", price: 89, press: "清华大学出版社", author: { age: 32, name: "柳伟卫" } }]
    );
    console.log("已经插入文档，响应结果是：", insertResult);

    // 查找全部文档
    const findResult = await book.find({}).toArray();
    console.log("查询所有文档，结果如下：", findResult);

    // 根据作者查找文档
    const filteredDocs = await book.find({ "author.name": '柳伟卫' }).toArray();
    console.log("根据作者查找文档，结果如下：", filteredDocs);

    // 修改单个文档
    const updateResult = await book.updateOne(
        { "author.name": "柳伟卫" },
        { $set: { "author.name": "Way Lau" } });
    console.log("修改单个文档，结果如下：", updateResult);

    // 修改多个文档
    const updateManyResult = await book.updateMany(
        { "author.name": "柳伟卫" },
        { $set: { "author.name": "Way Lau" } });
    console.log("修改多个文档，结果如下：", updateManyResult);

    // 删除单个文档
    const deleteResult = await book.deleteOne({ "author.name": "Way Lau" });
    console.log("删除单个文档，结果如下：", deleteResult);

    // 删除多个文档
    const deleteManyResult = await book.deleteMany({ "author.name": "Way Lau" });
    console.log("删除多个文档，结果如下：", deleteManyResult);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
