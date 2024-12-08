const dgram = require('node:dgram');
const message = Buffer.from('i love u');
const client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
  console.log(`客户端从${rinfo.address}:${rinfo.port}接收到消息: ${msg}`);
  console.log(`地址类型是${rinfo.family}，消息大小是${rinfo.size}`);
});

// 每隔2秒执行一次
setInterval(() => {
  client.send(message, 41234, 'localhost');
}, 2000
)
