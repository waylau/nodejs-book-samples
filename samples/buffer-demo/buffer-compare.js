const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

// 比较的第1种用法
console.log(arr.sort(Buffer.compare));
// 输出: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// 结果等同于 [buf2, buf1]

// 比较的第2种用法
console.log(buf1.compare(buf2));
// 输出1