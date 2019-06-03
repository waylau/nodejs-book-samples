const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),

    // 仅在使用客户端证书身份验证时才需要这样做
    requestCert: true,

    // 仅当客户端使用自签名证书时才需要这样做
    ca: [fs.readFileSync('client-cert.pem')]
};

const server = tls.createServer(options, (socket) => {
    console.log('server connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});

server.listen(8000, () => {
    console.log('server bound');
});