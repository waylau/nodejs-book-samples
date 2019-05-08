const fs = require('fs');

fs.open('data.txt', 'r', (err, fd) => {
    if (err) {
        throw err;
    }

    fs.fstat(fd, (err, stat) => {
        if (err) {
            throw err;
        }

        // 始终关闭文件描述符！
        fs.close(fd, (err) => {
            if (err) {
                throw err;
            }
        });
    });
});