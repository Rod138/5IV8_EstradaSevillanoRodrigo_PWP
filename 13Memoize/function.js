/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    return function () {
        const args = JSON.stringify(arguments);
        memoize.cache = memoize.cache || {};
        if (args in memoize.cache) {
            return memoize.cache[args];
        }
        const result = fn.apply(this, arguments);
        memoize.cache[args] = result;
        return result;
    }
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
})
console.log(memoizedFn(2, 3)) // 5
console.log(memoizedFn(2, 3)) // 5
console.log(callCount) // 1
