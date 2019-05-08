const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

let listener1 = function () {
    console.log('监听器listener1');
}

// 获取监听器的各数
let getListenerCount = function () {

    let count = myEmitter.listenerCount('foo');
    console.log("监听器监听各数为：" + count);
}

myEmitter.on('foo', listener1);

getListenerCount();

myEmitter.emit('foo');

// 移除监听器
myEmitter.removeListener('foo', listener1);

getListenerCount();


//////
// 添加多个监听器
myEmitter.on('foo', listener1);
myEmitter.on('foo', listener1);
myEmitter.on('foo', listener1);


getListenerCount();

// 移除所有监听器
myEmitter.removeAllListeners(['foo']);

getListenerCount();