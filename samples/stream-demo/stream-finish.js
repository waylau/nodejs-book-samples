const fs = require('fs');

const writable = fs.createWriteStream('write-data.txt');

for (let i = 0; i < 10; i++) {
  writable.write(`写入 #${i}!\n`);
}

writable.end('写入结尾\n');
writable.on('finish', () => {
  console.log('写入已完成');
})