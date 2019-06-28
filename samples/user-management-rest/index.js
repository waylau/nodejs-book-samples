const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');//用于req.
const URL = '/api/users';
const mysql = require('mysql');

// 连接信息.
// 使用连接池
const pool = mysql.createPool({
    connectionLimit: 4, // 连接数限制
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs_book'
});

app.use(bodyParser.json());

// 获取所有用户列表API
app.get(URL + '/', function (req, res) {

    // 获取连接
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        // 从请求参数中获取用户ID
        let name = req.query.name;

        console.log('User name is: ', name);
        
        if (name == null) {
            // 执行查询
            connection.query('SELECT * FROM t_user',
                function (error, results) {
                    // 错误处理
                    if (error) {
                        throw error;
                    }

                    // 打印执行结果
                    console.log('The result is: ', results);

                    // 释放连接
                    connection.release();

                    // 转为JSON返回
                    res.json(results).end();
                });
        } else {
            // 执行查询
            connection.query('SELECT * FROM t_user where username = ?', name,
                function (error, results) {
                    // 错误处理
                    if (error) {
                        throw error;
                    }

                    // 打印查询结果
                    console.log('The result is: ', results);

                    // 释放连接
                    connection.release();

                    // 转为JSON返回
                    res.json(results).end();
                });
        }
    });

});


// 获取指定ID的用户API
app.get(URL + '/:id', function (req, res) {


    // 获取连接
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        // 从请求参数中获取用户ID
        let id = req.params.id;

        console.log('User id is: ', id);

        // 执行查询
        connection.query('SELECT * FROM t_user where user_id = ?', id,
            function (error, results) {
                // 错误处理
                if (error) {
                    throw error;
                }

                // 打印执行结果
                console.log('The result is: ', results);

                // 释放连接
                connection.release();

                // 取第一个，转为JSON返回
                res.json(results[0]).end();
            });
    });

});


// 创建用户信息API
app.post(URL + '/', (req, res) => {

    // 获取连接
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        // 从请求参数中获取用户信息
        let username = req.body.username;

        console.log('User is: ', username);

        // 执行查询
        connection.query('INSERT INTO t_user (username) VALUES (?)', username,
            function (error, results) {
                // 错误处理
                if (error) {
                    throw error;
                }

                // 打印执行结果
                console.log('The result is: ', results);

                // 释放连接
                connection.release();

                // 转为JSON返回
                res.json(results).end();
            });
    });

});

// 更新用户信息API
app.put(URL + '/', (req, res) => {
    // 获取连接
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        // 从请求参数中获取用户信息
        let user_id = req.body.user_id;
        let username = req.body.username;

        console.log('User id is: ', user_id);
        console.log('User name is: ', username);
        // 执行查询
        connection.query('UPDATE t_user SET username = ? WHERE user_id = ? ', [username, user_id],
            function (error, results) {
                // 错误处理
                if (error) {
                    throw error;
                }

                // 打印执行结果
                console.log('The result is: ', results);

                // 释放连接
                connection.release();

                // 转为JSON返回
                res.json(results).end();
            });
    });

});

// 删除指定ID的用户API
app.delete(URL + '/:id', (req, res) => {

    // 获取连接
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        // 从请求参数中获取用户ID
        let id = req.params.id;

        console.log('User id is: ', id);

        // 执行查询
        connection.query('DELETE FROM t_user WHERE user_id = ? ', id,
            function (error, results) {
                // 错误处理
                if (error) {
                    throw error;
                }

                // 打印执行结果
                console.log('The result is: ', results);

                // 释放连接
                connection.release();

                // 转为JSON返回
                res.json(results).end();
            });
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));