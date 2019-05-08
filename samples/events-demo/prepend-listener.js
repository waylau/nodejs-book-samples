const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('foo', () => console.log('a'));
myEmitter.prependListener('foo', () => console.log('b'));
myEmitter.emit('foo');
// 输出:
//   b
//   a