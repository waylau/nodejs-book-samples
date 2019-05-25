const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;
let users = new Array();
let user;

const server = http.createServer((req, res) => {

  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    user = chunk;
    console.log(req.method + user);

    // 判断不同的方法类型
    switch (req.method) {
      case 'POST':
        users.push(user);
        console.log(users);
        break;
      case 'PUT':
        for (let i = 0; i < users.length; i++) {
          if (user == users[i]) {
            users.splice(i, 1, user);
            break;
          }
        }
        console.log(users);
        break;
      case 'DELETE':
        for (let i = 0; i < users.length; i++) {
          if (user == users[i]) {
            users.splice(i, 1);
            break;
          }
        }
        console.log(users);
        break;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(users));
  });

});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});