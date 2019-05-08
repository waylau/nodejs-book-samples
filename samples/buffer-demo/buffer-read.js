const buf = Buffer.from([-1, 5]);

console.log(buf.readInt8(0));
// 输出: -1

console.log(buf.readInt8(1));
// 输出: 5

console.log(buf.readInt8(2));
// 抛出 ERR_OUT_OF_RANGE 异常