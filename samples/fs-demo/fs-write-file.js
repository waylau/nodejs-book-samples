
const fs = require('fs');

let data = "《Node.js企业级应用开发实战》";
 
// 将数据写入文件。如果文件不存在则创建文件
fs.writeFile('write-data.txt', data, 'utf-8', (err) => {
    if (err) {
        throw err;
    }
});