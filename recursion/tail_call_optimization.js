function factorial_1(num, acc = 1) {
    return (num === 1) ? acc : () => factorial_1(num - 1, acc * num)
}

function sum_1(num, acc = 0) {
    return (num === 0) ? acc : () => sum_1(num - 1, acc + num)
}

// call-stack optimization

function trampoline(fn) {
    return function(...args) {
      let result = fn.apply(fn.context, args)
      while (typeof result === 'function') {
        result = result()
      }
  
      return result
    }
  }

const trampolineFactorial = trampoline(factorial_1)
const trampolineSum = trampoline(sum_1)

const results_1 = {
    'optimized tail-call factorial': trampolineFactorial(100),
    'optimized tail-call sum': trampolineSum(999999),
}

var style_1 = ['padding: 1rem;',
             'font: 1.3rem/3 Georgia;',
             'color: green;'].join('');
console.log('%c%s', style_1, 'optimized example')
console.table(results_1)
