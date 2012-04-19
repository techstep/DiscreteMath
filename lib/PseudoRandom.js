/* Pseudo random number generator based on a linear recurrence.
x_n+1 = (ax_n +c) mod m 
*/

function pseudoRandom(n, a, c, m, seed) {
    var r = '';
    var x = seed;
    for (var i = 0; i< n; i++) {
        x = (a*x+c) % m;
        r = r + String(x);
    }
    return r;
}

exports.pseudoRandom = pseudoRandom;
