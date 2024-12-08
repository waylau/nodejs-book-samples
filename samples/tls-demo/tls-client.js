// Assumes an echo server that is listening on port 8000.
const tls = require('node:tls');
const fs = require('fs');

const options = {
    // 仅在服务器需要客户端证书身份验证时才需要
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-cert.pem'),

    // 仅在服务器使用自签名证书时才需要
    ca: [fs.readFileSync('server-cert.pem')],

    // 仅当服务器的证书不是“localhost”时才需要
    checkServerIdentity: () => { return null; },
};

const socket = tls.connect(8000, options, () => {
    console.log('client connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});

socket.setEncoding('utf8');
socket.on('data', (data) => {
    console.log(data);
});
socket.on('end', () => {
    console.log('server ends connection');
});