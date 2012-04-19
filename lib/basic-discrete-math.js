var Euclid = require('./EuclidianAlgorithm');
exports.euclid = Euclid.euclid;

var Base2ExpansionUsingEuclidianAlgorithm = require('./Base2ExpansionUsingEuclidianAlgorithm');
exports.base2 = Base2ExpansionUsingEuclidianAlgorithm.base2;

var PermutationsAndCombinations = require('./PermutationsAndCombinations');
exports.C = PermutationsAndCombinations.C;
exports.P = PermutationsAndCombinations.P;
exports.factorial = PermutationsAndCombinations.factorial;

var Tree = require('./Tree.js');
exports.Node = Tree.Node;
exports.preorder = Tree.preorder;
exports.postorder = Tree.postorder;
exports.inorder = Tree.inorder;

var Graph = require('./Graph.js');
exports.Graph = Graph.Graph;

var PseudoRandom = require('./PseudoRandom');
exports.pseudoRandom = PseudoRandom.pseudoRandom;

var Primes = require('./Primes');
exports.isPrime = Primes.isPrime;
exports.erasthones = Primes.erasthones;
exports.factors = Primes.factors;

var Sums = require('./Sums');
exports.sum = Sums.sum;
exports.prod = Sums.prod;

var Matrix = require('./Matrix');
exports.Matrix = Matrix.Matrix;

