const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
let m = 0;

myEmitter.once('event', () => {
    console.log(++m);
});

myEmitter.emit('event');
// 打印: 1
myEmitter.emit('event');
// 不触发