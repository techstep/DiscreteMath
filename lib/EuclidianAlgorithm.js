/* Euclidian algorithm to find the LCM and GCD of 2 numbers */

// div(x,y) integer division
function div(x,y){
    return Math.floor(x/y);
}

// mod(x,y): modulus
function mod(x,y) {
    return x % y;
}

// Euclidian algorithm.
function euclid(x, y) {
    var inputx = x;
    var inputy = y;

    if (y > x) {
        var tmp = x;
        x = y;
        y = tmp;
    }

    var oldRemainder;
    var remainder;
    var quotient;
    do {
        oldRemainder = remainder;
        remainder = mod(x,y);
        quotient = div(x,y);
        console.log(x + " = " + y + " * " + quotient + " + " + remainder);
        x = y;
        y = remainder;
    } while (remainder != 0);
    var gcd = oldRemainder;
    console.log("gcd = " + gcd);
    var lcm = inputx * inputy / gcd;
    console.log("lcm = " + (inputx * inputy / gcd)); 
    return [gcd, lcm];
}


exports.euclid = euclid;