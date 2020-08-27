function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

let curriedSum = curry(sum);

const totalResult = curriedSum(1)(25)(10)(24)(12);
console.log(totalResult)