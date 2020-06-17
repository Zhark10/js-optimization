function factorial_0(num) {
    return (num === 1) ? 1 : num * factorial_0(num - 1)
}

function factorial_tail_call_0(num, acc = 1) {
    return (num === 1) ? acc : factorial_tail_call_0(num - 1, acc * num)
}

function sum_0(num) {
    return (num === 0) ? 0 : num + sum_0(num - 1)
}

function sum_tail_call_0(num, acc = 0) {
    return (num === 0) ? acc : sum_tail_call_0(num - 1, acc + num)
}

const results_0 = {
    'recursion factorial': factorial_0(10),
    'tail-call factorial': factorial_tail_call_0(10),
    'recursion sum': sum_0(1000),
    'tail-call sum': sum_tail_call_0(1000),
}

var style_0 = ['padding: 1rem;',
             'font: 1.3rem/3 Georgia;',
             'color: red;'].join('');
console.log('%c%s', style_0, 'no optimized example')
console.table(results_0)