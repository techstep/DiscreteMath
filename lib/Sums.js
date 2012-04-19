function sum(min, max, fn) {
    var sum = 0;
    for (var i = min; i<=max; i++) {
        sum += fn(i);
    }
    return sum;
}

function prod(min, max, fn) {
    var prod = 1;
    for (var i = min; i<=max; i++) {
        prod *= fn(i);
    }
    return prod;
}

exports.sum = sum;
exports.prod = prod;

//test();
