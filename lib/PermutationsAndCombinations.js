/* Calculate C(n,k) and P(n,k) */

function factorial(n)  {
    if (n < 0) {
        throw ("error");
    }

    if (n == 0) {
        return 1;
    }

    if (n == 1) {
        return 1;
    }
    
    var r = 1;
    while (n > 1) {
        r *= n;
        n--;
    }
    return r;
}

function C(n,r) {
    return (factorial(n) / (factorial(r)*factorial(n-r)) );
}


function P(n, r) {
    var result = 1;
    var i = n;
    while (i >= (n-r +1)) {
        result *= i;
        i--;
    }
    return result;
}


exports.factorial = factorial
exports.C = C;
exports.P = P;

//test();
