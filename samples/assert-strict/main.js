// 使用遗留模式
const assert = require('assert');

// 生成AssertionError对象
const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
});

// 验证错误信息输出:
try {
    // 验证两个值是否相等
    assert.strictEqual(1, 2); // false
} catch (err) {
    // 验证类型
    assert(err instanceof assert.AssertionError); // true

    // 验证值
    assert.strictEqual(err.message, message); // true
    assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]'); // false
    assert.strictEqual(err.actual, 1); // true
    assert.strictEqual(err.expected, 2); // true
    assert.strictEqual(err.code, 'ERR_ASSERTION'); // true
    assert.strictEqual(err.operator, 'strictEqual'); // true
    assert.strictEqual(err.generatedMessage, true);  // true
}
