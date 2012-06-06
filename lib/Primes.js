/* Brute force method for determinining primality based
on successive division.
*/
function isPrime(n) {
    var j = Math.ceil(Math.sqrt(n));
    for (var i = 2; i<= j; i++) {
        if (n % i == 0) {
            if (n == i) {
            } else {
                console.log(i + " is a divisor");
                return false;
            }
        }
    }
    return true;
}

// Number seive invented by Erasthones for generating prime numbers up to n.
// Source, wikipedia.
function erasthones(n) {
    var A = [];
    for (var i = 2; i< n; i++) {
        A[i] = true;
    }

    for (var i = 2; i<n/2; i++) {
        if (A[i]) {
            var j = 2*i;
            while (j < n) {
                A[j] = false;
                j+= i;
            }
        }
    }
    
   // console.log(A);
    var R = [];
    for (var i in A) {
        if (A[i]) {
            R.push(i);
        }
    }
    return R;
}

// Determine the prime factorization of n.
function factors(n) {
    var E = erasthones(n);
    var factors = [];
    
    for (var i in E) {
        var k = n % E[i];
        while (k == 0) {
            factors.push(E[i]);
            n = n / E[i];
            k = n % E[i];
        }
    }
    return factors;
}

exports.isPrime = isPrime
exports.erasthones = erasthones;
exports.factors = factors;


