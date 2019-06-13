const mysql = require('mysql');

// 连接信息
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs_book'
});

// 建立连接
/// connection.connect();
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

// 执行查询
connection.query('SELECT * FROM t_user',
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('SELECT result is: ', results);
    });

// 插入数据
var data = { user_id: 2, username: 'waylau' };
connection.query('INSERT INTO t_user SET ?', data,
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('INSERT result is: ', results);
    });

// 执行查询
connection.query('SELECT * FROM t_user',
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('SELECT result is: ', results);
    });

// 更新数据
connection.query('UPDATE t_user SET username = ? WHERE user_id = ?', ['Way Lau', 2],
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('UPDATE result is: ', results);
    });

// 执行查询
connection.query('SELECT * FROM t_user',
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('SELECT result is: ', results);
    });


// 更新数据
connection.query('UPDATE t_user SET username = ? WHERE user_id = ?', ['Way Lau', 2],
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('UPDATE result is: ', results);
    });

// 执行查询
connection.query('SELECT * FROM t_user',
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('SELECT result is: ', results);
    });

// 删除数据
connection.query('DELETE FROM t_user WHERE user_id = ?', 2,
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('DELETE result is: ', results);
    });

// 执行查询
connection.query('SELECT * FROM t_user',
    function (error, results, fields) {
        if (error) {
            throw error;
        }

        // 打印查询结果
        console.log('SELECT result is: ', results);
    });

// 关闭连接
///connection.end();
///connection.destroy();
connection.end(function (err) {
    if (err) {
        console.error('error end: ' + err.stack);
        return;
    }

    console.log('end connection');
});
