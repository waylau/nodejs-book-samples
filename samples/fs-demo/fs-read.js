const fs = require('fs');

fs.open('data.txt', 'r', (err, fd) => {
    if (err) {
        throw err;
    }

    
    var buffer = Buffer.alloc(255);

    // 读取文件
    fs.read(fd, buffer, 0, 255, 0, (err, bytesRead, buffer) => {
        if (err) {
            throw err;
        }

        // 打印出buffer中存入的数据
        console.log(bytesRead, buffer.slice(0, bytesRead).toString());

        // 始终关闭文件描述符！
        fs.close(fd, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});