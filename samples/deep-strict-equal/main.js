// 使用严格模式
const assert = require('assert').strict;


// 1 !== '1'.
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   {
// +   a: 1
// -   a: '1'
//   }

// 对象没有自己的属性
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// [[Prototype]]不同
assert.deepStrictEqual(object, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + {}
// - Date {}

// 类型标签不同
assert.deepStrictEqual(date, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 2019-04-26T00:49:08.604Z
// - Date {}

// 正确，因为符合SameValue比较
assert.deepStrictEqual(NaN, NaN);

// 未包装时数字不同
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + [Number: 1]
// - [Number: 2]

// 正确，对象和字符串未包装时是相同的。
assert.deepStrictEqual(new String('foo'), Object('foo'));

// 正确
assert.deepStrictEqual(-0, -0);

// 对于SameValue比较而言0和-0是不同的
assert.deepStrictEqual(0, -0);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();

// 正确，所有对象上都是相同的Symbol
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
//
// {
//   [Symbol()]: 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, {}]]);
const weakMap3 = new WeakMap();
weakMap3.unequal = true;

// 正确，因为无法比较条目
assert.deepStrictEqual(weakMap1, weakMap2);

// 失败！因为weakMap3有一个unequal属性，而weakMap1没有这个属性
assert.deepStrictEqual(weakMap1, weakMap3);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   WeakMap {
// +   [items unknown]
// -   [items unknown],
// -   unequal: true
//   }