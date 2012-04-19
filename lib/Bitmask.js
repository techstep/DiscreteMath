/*  Bitmask is a class for creating bitmask's.
 *  For example, for the universe U = {1,2,3,4,5} and
 *  the subset S = {3,4} the bitmask for S relative to U  
 *  is = 0b00110.
 */
 
 /* dependencies:
 	Set = Set.js
 */
var Bitmask = function(subset, universe) {
	
	if (subset == undefined) {
		return;
	}
	
	
	if ( (subset instanceof Set) && (universe instanceof Set) ) {
	 //continue
	} else {
		throw "Arguments to bitmask must be a subuset and a set specifying the universe.";
	}
	
	var seen = new Array();
	s = subset.data();
	u = universe.data();
	for (var i in s) {
		seen[ s[i] ] = 1;
	}
	var bitString = '';
	for (var i in u) {
		if (seen[u[i]]) {
			bitString = bitString + "1";
		} else {
			bitString = bitString + "0";
		}
	}
	
	var RADIX = 2;
	var bin = parseInt(bitString, RADIX);
	this._data = bin;
}
Bitmask.prototype.data = function() {
	return this._data;
}
Bitmask.prototype.toString = function() {
	return this._data.toString(2);
};
Bitmask.prototype.and = function(S) {
	var newData = this.data() & S.data();
	var b = new Bitmask();
	b._data = newData;
	return b;
}
Bitmask.prototype.xor = function(S) {
	var newData = this.data() ^ S.data();
	var b = new Bitmask();
	b._data = newData;
	return b;
}


exports.Bitmask = Bitmask;
	