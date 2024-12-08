const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`服务器错误:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器从${rinfo.address}:${rinfo.port}接收到消息: ${msg}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

server.bind(41234); // 输出为: 服务器监听 0.0.0.0:41234