const fs = require('node:fs');

const readable = fs.createReadStream('data.txt');

readable.on('data', (chunk) => {
  console.log(`接收到 ${chunk.length} 字节的数据`);

  // 暂停
  readable.pause();

  console.log('暂停一秒');
  setTimeout(() => {
    console.log('数据重新开始流动');

    // 继续
    readable.resume();
  }, 1000);
});

readable.on('end', () => {
  console.log('结束');
});

/// 不可使用readable事件
/*
readable.on('readable', () => {
  console.log(`读取的数据: ${readable.read()}`);
});
*/
