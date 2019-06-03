const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');//用于req.body获取值的
app.use(bodyParser.json());


// 存储用户信息
let users = new Array();

app.get('/', (req, res) => res.json(users).end());

app.post('/', (req, res) => {
    let user = req.body.name;

    users.push(user);

    res.json(users).end();
});

app.put('/', (req, res) => {
    let user = req.body.name;

    for (let i = 0; i < users.length; i++) {
        if (user == users[i]) {
            users.splice(i, 1, user);
            break;
        }
    }

    res.json(users).end();
});

app.delete('/', (req, res) => {
    let user = req.body.name;

    for (let i = 0; i < users.length; i++) {
        if (user == users[i]) {
            users.splice(i, 1);
            break;
        }
    }
    
    res.json(users).end();
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));