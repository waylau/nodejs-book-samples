const fs = require('node:fs');
var express = require('express');
var app = express();
var http = require('node:http').Server(app);
var io = require("socket.io")(http);
// 路由为/默认www静态文件夹
app.use('/', express.static(__dirname + '/src'));

// 后台接口，读取本地图片资源
let portrait = fs.readdirSync('./src/static/portrait')
let emoji = fs.readdirSync('./src/static/emoticon/emoji')

app.get('*', (req, res) => {
    const assetsType = req.url.split('/')[1];

    // 加载图片资源
    if (assetsType === 'loadImg') {
        res.send({
            code: 0,
            data: {
                portrait,
                emoji
            },
            msg: '操作成功'
        })
    }
})

let userList = [];
io.on('connection', (socket) => {
    // 前端调用发送消息接口，后端接收到并广播
    socket.on('login', (userInfo) => {
        userList.push(userInfo);

        // 给所有客户端广播消息
        io.emit('userList', userList);
    })

    socket.on('sendMsg', (data) => {
        // 接收到的消息广播
        socket.to(data.id).emit('receiveMsg', data)
    })

    // 退出
    socket.on('disconnect', () => {
        userList = userList.filter(item => item.id != socket.id)
        io.emit('quit', socket.id)
    })
})

http.listen(3001, () => {
    console.log('http://localhost:3001/index.html')
});
