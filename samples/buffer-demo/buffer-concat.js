// 创建三个Buffer实例
const buf1 = Buffer.alloc(1);
const buf2 = Buffer.alloc(4);
const buf3 = Buffer.alloc(2);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength); // 7

// 连接三个Buffer实例
const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA); // <Buffer 00 00 00 00 00 00 00>

console.log(bufA.length); // 7
