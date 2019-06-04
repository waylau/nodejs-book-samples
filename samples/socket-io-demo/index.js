
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', socket => {

    // 监听断开连接状态
    socket.on('disconnect', () => {
        console.log('connect disconnect');
    });

    // 与客户端对应的接收指定的消息
    socket.on('client message', (data) => {
        console.log('receive client message: ' + data);

        // io.emit()方法用于向客户端端发送消息
        io.emit('server message', 'Welcome!');

    });

});

http.listen(8080, function () {
    console.log('listening on 8080');
});
