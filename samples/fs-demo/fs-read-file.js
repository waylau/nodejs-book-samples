const fs = require('fs');

fs.readFile('data.txt', (err, data) => {
    if (err) {
        throw err;
    }

    console.log(data);
});

// 指定为UTF-8
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    console.log(data);
});