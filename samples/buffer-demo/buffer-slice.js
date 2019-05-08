const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97在ASCII中的值是'a'.
  buf1[i] = i + 97;
}

const buf2 = buf1.slice(0, 3);

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出: abc

buf1[0] = 33; // 33在ASCII中的值是'!'.

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出: !bc


//////
// 指定大于buf.length的结束索引，
// 将返回结束索引等于buf.length相同的结果
const buf = Buffer.from('buffer');

console.log(buf.slice(-6, -1).toString());
// 输出: buffe
// 等同于：buf.slice(0, 5)

console.log(buf.slice(-6, -2).toString());
// 输出：buff
// 等同于：buf.slice(0, 4)

console.log(buf.slice(-5, -2).toString());
// 输出：uff
// 等同于：buf.slice(1, 4)


//////
// 修改新的Buffer片段将会同时修改原始Buffer中的内存
const oldBuf = Buffer.from('buffer');
const newBuf = oldBuf.slice(0, 3);

console.log(newBuf.toString()); // buf

// 修改新的Buffer
newBuf[0] = 97;  // 97在ASCII中的值是'a'.

console.log(oldBuf.toString()); // auffer