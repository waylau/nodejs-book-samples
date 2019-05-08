const fs = require("fs");

console.log("查看当前目录下所有的文件");

fs.readdir(".", (err, files) => {
    if (err) {
        throw err;
    }

    // 列出文件名称
    files.forEach(function (file) {
        console.log(file);
    });
});