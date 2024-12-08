const net = require('node:net');

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

        // 如果收到c字符，就终止连接
        if (data == 'c') {
            socket.write('bye!');
            socket.end(); // 关闭socket
            // 如果收到k字符，就关闭服务器
        } else if (data == 'k') {
            socket.write('bye!');
            socket.end(); // 关闭socket
            server.close();// 关闭服务器
        } else {
            socket.write(data);
        }

    })
})

server.on('listening', () => {
    console.log('服务器接收到listening事件');
})

// 绑定到端口
server.listen(8888, () => {
    console.log('服务器启动，端口：8888');
});