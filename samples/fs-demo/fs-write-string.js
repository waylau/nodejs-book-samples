
const fs = require('fs');

// 打开文件用于写入。如果文件不存在则创建文件
fs.open('write-data.txt', 'w', (err, fd) => {
    if (err) {
        throw err;
    }


    let string = "《Node.js企业级应用开发实战》";

    // 写入文件
    fs.write(fd, string, 0, 'utf8', (err, written, buffer) => {
        if (err) {
            throw err;
        }

        // 打印出存入的字节数
        console.log(written);

        // 始终关闭文件描述符！
        fs.close(fd, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});