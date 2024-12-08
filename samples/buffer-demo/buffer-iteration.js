// 引用Buffer模块
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// 输出:
//   1
//   2
//   3