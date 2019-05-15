const net = require('net');

const server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // 处理错误
    throw err;
});

server.on('close', () => {
    console.log('服务器接收到close事件');
})

server.on('connection', () => {
    console.log('服务器接收到connection事件')
})

server.on('listening', () => {
    console.log('服务器接收到listening事件')
})

// 随机获取未绑定的端口
server.listen(() => {
    console.log('服务器启动，占用端口：', server.address());
});
