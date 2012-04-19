/* 	Set is a class for creating and manipulating sets. 
 *	For example, creating a set from the array [1,1,2,2,3,4,7,5] we get
 *	{1,2,3,4,5,7}.  We can perform some logical operations on sets such
 *	as OR and AND, see below.
*/

/* dependencies:
	_und = underscore.js
	Bitmask = Bitmask.js
*/

var Set = function(rawData) {
	this._data = new Array();
	
	if ( rawData instanceof Array ) {
	} else {
		throw "Argument to Set constructor should be an array.";
	}	
	var seen = new Array();
	for (var i in rawData) {
		seen[rawData[i]] = 1;
	}
	this._data = _und.keys(seen).sort();
}

// Return the underlying array representation of the set
Set.prototype.data = function() {
	return this._data;
}

// Create the bitmask for this set relative to a universal Set
// example:
//  U = {a, b, c, d, e, f}
//  S = {a, f}
//  the bitmask for S relative to U would be:
//  	0b100001
Set.prototype.bitmask = function(universe) {
	return new BitMask(this, universe);
}

//Apply a bitmask to this set
// example:
// {a, b, c, d} with the bitmask 0b11 applied  = {c, d}
Set.prototype.applyBitmask = function(bitmask) {
	var bstr = bitmask.toString();
	var data = new Array;
	var setSize = this._data.length;
	for (var i=bstr.length; i>0; i--) {
		var charInBstr = bstr.charAt(i - 1);
		var objInSet = this._data[setSize - bstr.length + i -1];
		
		if (charInBstr == 1) {
			data.push(objInSet);
		}
	}
	return new Set(data);
}

// pretty print
Set.prototype.toString = function() {
	return "{" + this._data.toString() + "}";
}

// OR this set with a second set
Set.prototype.or = function(s) {
	return new Set(this.data().concat(s.data()));
}

// AND this set with a second set.
Set.prototype.and = function(s) {
	var U = new Set(this.data().concat(s.data()));
	var thisBitmask = new Bitmask(this, U);
	var sBitmask = new Bitmask(s, U);
	var Rb = thisBitmask.and(sBitmask);
	return(U.applyBitmask(Rb));
}


Set.prototype.xor = function(s) {
	var U = new Set(this.data().concat(s.data()));
	var thisBitmask = new Bitmask(this, U);
	var sBitmask = new Bitmask(s, U);
	var Rb = thisBitmask.xor(sBitmask);
	return(U.applyBitmask(Rb));
}

exports.Set = Set;