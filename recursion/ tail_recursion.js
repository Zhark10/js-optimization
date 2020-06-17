// resursion

function factorial(num) {
    return (num === 1) ? 1 : num * factorial(num - 1)
}

console.log(factorial(100))

// tail recursion

function factorial(num, acc = 1) {
    return (num === 1) ? acc : factorial(num - 1, acc * num)
}

console.log(factorial(100))
