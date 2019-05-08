const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('foo', () => {});

console.log(myEmitter.listeners('foo'));
// 输出: [ [Function] ]