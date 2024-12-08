const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client.html'));
});

// 监听客户端连接
io.on('connection', (socket) => {
    console.log('client connected');

    // 监听断开连接状态
    socket.on('disconnect', () => {
        console.log('connect disconnect');
    });

    // 与客户端对应的接收指定的消息
    socket.on('client message', (msg) => {
        // 输出服务端接收到到的客户端数据
        console.log('receive client message: ' + msg);

        // 发送消息
        io.emit('server message', 'Welcome!');
    });
});

server.listen(8080, () => {
    console.log('listening on 8080');
});
