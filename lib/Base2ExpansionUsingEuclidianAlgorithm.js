/* Base 2 expansion of a decimal, using
   the Euclidian algorithm.
*/

// div(x,y): integer division
function div(x,y){
    return Math.floor(x/y);
}

// mod(x,y): modulus
function mod(x,y) {
    return x % y;
}

// Base 2 expansion using Euclidian Algorithm
function base2(x) {
    var remainder;
    var quotient;
    var bitstring = "";
    do {
        remainder = mod(x,2);
        quotient = div(x, 2);
        console.log ( x + " = " + quotient + " * 2 + " + remainder);
        x = quotient;
        bitstring = remainder + bitstring;
    } while (quotient != 0);
    console.log(bitstring);
    return bitstring;
}

function test() {
    base2(147);
}

exports.base2 = base2;

//test();