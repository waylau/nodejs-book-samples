const fs = require('fs');

const readable = fs.createReadStream('data.txt');

const writable = fs.createWriteStream('write-data.txt');

// readable的所有数据都推送到'write-data.txt'
readable.pipe(writable);

setTimeout(() => {
  console.log('停止写入数据');
  readable.unpipe(writable);
  console.log('手动关闭文件流');
  writable.end();
}, 3);
