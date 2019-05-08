const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
    // 输出: a b {}
});

myEmitter.emit('event', 'a', 'b');