const MongoClient = require('mongodb').MongoClient;

// 连接URL
const url = 'mongodb://localhost:27017';

// 数据库名称
const dbName = 'nodejsBook';

// 创建MongoClient客户端
const client = new MongoClient(url);

// 使用连接方法来连接到服务器
client.connect(function (err) {
    if (err) {
        console.error('error end: ' + err.stack);
        return;
    }

    console.log("成功连接到服务器");

    const db = client.db(dbName);

    // 插入多个文档
    insertDocuments(db, function () {
        client.close();
    });


    // 查找全部文档
    findDocuments(db, function () {
        client.close();
    });


    // 根据作者查找文档
    findDocumentsByAuthorName(db, "柳伟卫", function () {
        client.close();
    });

    // 修改单个文档
    updateDocument(db, function () {
        client.close();
    });

    // 修改多个文档
    updateDocuments(db, function () {
        client.close();
    });

    // 删除单个文档
    removeDocument(db, function () {
        client.close();
    });

    // 删除多个文档
    removeDocuments(db, function () {
        client.close();
    });

});

// 插入文档
const insertDocuments = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 插入文档
    book.insertMany([
        { title: "Spring Boot 企业级应用开发实战", price: 98, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "Spring Cloud 微服务架构开发实战", price: 79, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } },
        { title: "Spring 5 案例大全", price: 119, press: "北京大学出版社", author: { age: 32, name: "柳伟卫" } }], function (err, result) {
            console.log("已经插入文档，响应结果是：");
            console.log(result);
            callback(result);
        });
}

// 查找全部文档
const findDocuments = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 查询文档
    book.find({}).toArray(function (err, result) {
        console.log("查询所有文档，结果如下：");
        console.log(result)
        callback(result);
    });
}

// 根据作者查找文档
const findDocumentsByAuthorName = function (db, authorName, callback) {
    // 获取集合
    const book = db.collection('book');

    // 查询文档
    book.find({ "author.name": authorName }).toArray(function (err, result) {
        console.log("根据作者查找文档，结果如下：");
        console.log(result)
        callback(result);
    });
}

// 修改单个文档
const updateDocument = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 修改文档
    book.updateOne(
        { "author.name": "柳伟卫" },
        { $set: { "author.name": "Way Lau" } }, function (err, result) {
            console.log("修改单个文档，结果如下：");
            console.log(result)
            callback(result);
        });
}


// 修改单个文档
const updateDocuments = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 修改文档
    book.updateMany(
        { "author.name": "柳伟卫" },
        { $set: { "author.name": "Way Lau" } }, function (err, result) {
            console.log("修改多个文档，结果如下：");
            console.log(result)
            callback(result);
        });
}

// 删除单个文档
const removeDocument = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 删除文档
    book.deleteOne({ "author.name": "Way Lau" }, function (err, result) {
        console.log("删除单个文档，结果如下：");
        console.log(result)
        callback(result);
    });
}

// 删除多个文档
const removeDocuments = function (db, callback) {
    // 获取集合
    const book = db.collection('book');

    // 删除文档
    book.deleteMany({ "author.name": "Way Lau" }, function (err, result) {
        console.log("删除多个文档，结果如下：");
        console.log(result)
        callback(result);
    });
}