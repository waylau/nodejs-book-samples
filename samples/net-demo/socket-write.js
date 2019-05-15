const net = require('net');

const server = net.createServer();

server.on('error', (err) => {
    // 处理错误
    throw err;
});

server.on('close', () => {
    console.log('服务器接收到close事件');
})

server.on('connection', (socket) => {
    console.log('服务器接收到connection事件');
    socket.setEncoding('utf8');
    socket.write('welcome!');

    socket.on('data', (data) => {
        console.log('服务器接收到的数据为：' + data);
        socket.write(data);
    })
})

server.on('listening', () => {
    console.log('服务器接收到listening事件');
})

// 绑定到端口
server.listen(8888, () => {
    console.log('服务器启动，端口：8888');
});
