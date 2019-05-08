const fs = require('fs');

const rr = fs.createReadStream('data.txt');

rr.on('readable', () => {
  console.log(`读取的数据: ${rr.read()}`);
});

rr.on('end', () => {
  console.log('结束');
});