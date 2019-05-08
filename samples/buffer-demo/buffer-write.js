const buf = Buffer.allocUnsafe(2);

buf.writeInt8(2, 0);
buf.writeInt8(4, 1);

console.log(buf);
// 输出: <Buffer 02 04>