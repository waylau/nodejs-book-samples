// 以UTF-8编码初始化缓冲区数据
const buf = Buffer.from('Hello World!你好，世界！', 'utf8');

// 转为十六进制字符
console.log(buf.toString('hex'));
// 输出：48656c6c6f20576f726c6421e4bda0e5a5bdefbc8ce4b896e7958cefbc81

// 转为Base64编码
console.log(buf.toString('base64'));
// 输出：SGVsbG8gV29ybGQh5L2g5aW977yM5LiW55WM77yB

