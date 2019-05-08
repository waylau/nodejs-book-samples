
const fs = require('fs');

// 打开文件用于写入。如果文件不存在则创建文件
fs.open('write-data.txt', 'w', (err, fd) => {
    if (err) {
        throw err;
    }


    let buffer = Buffer.from("《Node.js企业级应用开发实战》");

    // 写入文件
    fs.write(fd, buffer, 0, buffer.length, 0, (err, bytesWritten, buffer) => {
        if (err) {
            throw err;
        }

        // 打印出buffer中存入的数据
        console.log(bytesWritten, buffer.slice(0, bytesWritten).toString());

        // 始终关闭文件描述符！
        fs.close(fd, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});