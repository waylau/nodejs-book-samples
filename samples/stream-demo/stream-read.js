const fs = require('fs');

const readable = fs.createReadStream('data.txt');

// 设置字符编码
readable.setEncoding('utf-8');

// 读取数据
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read(10))) {
    console.log(`接收到 ${chunk.length} 字节的数据`);
    console.log(`接收到的数据是： ${chunk}`);
  }
});

readable.on('end', () => {
  console.log('结束');
});
