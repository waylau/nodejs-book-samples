const fs = require('node:fs');
const zlib = require('zlib');

const readable = fs.createReadStream('data.txt');

const writable = fs.createWriteStream('write-data.txt');

// readable的所有数据都推送到'write-data.txt'
readable.pipe(writable);

/////
const gzip = zlib.createGzip();
const writable2 = fs.createWriteStream('write-data.txt.gz');

// 在单个可读流上绑定多个可写流
readable.pipe(gzip).pipe(writable2);

readable.on('readable', () => {
  console.log(`读取的数据: ${readable.read()}`);
});

readable.on('end', () => {
  console.log('结束');
});
