const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('异步进行');
    });
});

myEmitter.emit('event', 'a', 'b');