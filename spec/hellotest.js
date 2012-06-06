var dm = require('../lib/basic-discrete-math');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("A discrete math library", function() {
    it("properly calculates primality (1)", function() {
        expect(dm.isPrime(1)).toBe(false);
    });
    
    it("properly calculates primality (2)", function() {
        expect(dm.isPrime(2)).toBe(true);
    });
    
    
    it("properly calculates primality of simple even non-primes", function() {
        expect(dm.isPrime(4)).toBe(false);
        expect(dm.isPrime(6)).toBe(false);
        expect(dm.isPrime(8)).toBe(false);
        expect(dm.isPrime(10)).toBe(false);
        expect(dm.isPrime(12)).toBe(false);
        expect(dm.isPrime(144)).toBe(false);
    });
    
    it("properly calculates primality of simple primes", function() {
        expect(dm.isPrime(3)).toBe(true);
        expect(dm.isPrime(5)).toBe(true);
        expect(dm.isPrime(7)).toBe(true);
        expect(dm.isPrime(11)).toBe(true);
        expect(dm.isPrime(17)).toBe(true);
        expect(dm.isPrime(23)).toBe(true);
    });
    
    it("agrees with the seive of erasthones implementation", function() {
        var primeArray = dm.erasthones(500);
        for (var i = 0; i<primeArray.length; i++) {
            expect(dm.isPrime(primeArray[i])).toBe(true);
        }
    });
});