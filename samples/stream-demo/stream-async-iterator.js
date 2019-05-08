const fs = require('fs');

const readable = fs.createReadStream('data.txt');

async function print(readable) {
  readable.setEncoding('utf8');
  let data = '';

  // 迭代器
  for await (const k of readable) {
    data += k;
  }
  console.log(data);
}


print(readable).catch(console.log);