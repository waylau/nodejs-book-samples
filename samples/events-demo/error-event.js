const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

// 为error事件注册监听器
myEmitter.on('error', (err) => {
    console.error('错误信息');
});

// 模拟触发error事件
myEmitter.emit('error', new Error('错误信息'));
// 抛出错误