const assert = require('assert');
const isCollinear = require("../businessLogicModels/isCollinear.js");

// describe('Array', function() {
//     describe('#indexOf()', function() {
// 	it('should return -1 when the value is not present', function() {
// 	    assert.equal([1,2,3].indexOf(4), -1);
// 	});
//     });
// });

// describe('Basic Mocha String Test', function () {
//     it('should return number of characters in a string', function () {
// 	assert.equal("Hello".length, 4);
//     });

//     it('should return first character of the string', function () {
// 	assert.equal("Hello".charAt(0), 'H');
//     });
// });
	 
// helper functions tests 
describe('Practice test for array equals mod', function () {
    it('if two arrays contain the same elements in the same order then return true', function () {
	assert.equal([1,2].arrEquals([1,2]), true);
    });
    
    it('if two arrays contain the same elements but not in the same order then return false', function () {
	assert.equal([2,1].arrEquals([1,2]), false);
    });

    it('if two arrays contain one different element and one same element but not the same order return false', function () {
	assert.equal([3,1].arrEquals([1,2]), false);
    });

    it('if two arrays contain one different element and one same element and the common element is in the same order return false', function () {
	assert.equal([1,3].arrEquals([1,2]), false);
    });


    it('if two arrays contain different elements return false', function () {
	assert.equal([3,1].arrEquals([4,2]), false);
    });
    
    
    // it('should return first character of the string', function () {
    // 	assert.equal("Hello".charAt(0), 'H');
    // });
});
	 
describe('Practice test for hasDupes', function () {
    it('return true if two arrays (of arrays) have duplicate elements', function () {
	assert.equal(isCollinear.hasDupes([[1,2],[3,5]],[[1,4],[1,2]]), true);
    });
    
    it('return false if two arrays (of arrays) dont have duplicate elements, but share some coordinate value', function () {
	assert.equal(isCollinear.hasDupes([[1,5],[3,6]],[[1,4],[1,2]]), false);
    });

    it('return false if two arrays (of arrays) dont have duplicate elements and dont share any coordinate values', function () {
	assert.equal(isCollinear.hasDupes([[2,5],[3,7]],[[6,4],[8,1]]), false);
    });
    
    
    // it('should return first character of the string', function () {
    // 	assert.equal("Hello".charAt(0), 'H');
    // });
});


// main pipeline tests
describe('Unit test for sublist', function () {
    it('set4 takes an array of arrays and an empty array, each of which has 3 points and a slope, returns a totals array which is those arrays subdivided by collinear ', function () {
	assert.equal(isCollinear.sublist([ [ 1, [ 2, 2 ], [ 3, 3 ], [ 1, 1 ] ],
  [ -1, [ 2, 2 ], [ 3, 1 ], [ 1, 3 ] ],
  [ -1, [ 3, 1 ], [ 0, 4 ], [ 1, 3 ] ],
  [ -1, [ 0, 4 ], [ 4, 0 ], [ 1, 3 ] ],
  [ -1, [ 3, 1 ], [ 0, 4 ], [ 2, 2 ] ],
  [ -1, [ 0, 4 ], [ 4, 0 ], [ 2, 2 ] ],
[ -1, [ 0, 4 ], [ 4, 0 ], [ 3, 1 ] ] ], []), );
    });

    it('set 3 takes an array of arrays, each of which has 3 points and a slope, returns a totals array which is those arrays subdivided by collinear ', function () {
	assert.equal(isCollinear.sublist([ [ 1, [ 2, 2 ], [ 3, 3 ], [ 1, 1 ] ],
  [ 1, [ 3, 3 ], [ 4, 4 ], [ 1, 1 ] ],
  [ 1, [ 4, 4 ], [ 5, 5 ], [ 1, 1 ] ],
  [ 1, [ 3, 3 ], [ 4, 4 ], [ 2, 2 ] ],
  [ 1, [ 4, 4 ], [ 5, 5 ], [ 2, 2 ] ],
					   [ 1, [ 4, 4 ], [ 5, 5 ], [ 3, 3 ] ] ], []), true);
    });
    
    // it('return false if two arrays (of arrays) dont have duplicate elements, but share some coordinate value', function () {
    // 	assert.equal(isCollinear.hasDupes([[1,5],[3,6]],[[1,4],[1,2]]), false);
    // });

    // it('return false if two arrays (of arrays) dont have duplicate elements and dont share any coordinate values', function () {
    // 	assert.equal(isCollinear.hasDupes([[2,5],[3,7]],[[6,4],[8,1]]), false);
    // });
    
    
    // it('should return first character of the string', function () {
    // 	assert.equal("Hello".charAt(0), 'H');
    // });
});
	 
// describe('Unit test for determineLinesCollinearWithFocal', function () {
//     it('return true if two arrays (of arrays) have duplicate elements', function () {
// 	assert.equal(isCollinear.hasDupes([[1,2],[3,5]],[[1,4],[1,2]]), true);
//     });
    
//     it('return false if two arrays (of arrays) dont have duplicate elements, but share some coordinate value', function () {
// 	assert.equal(isCollinear.hasDupes([[1,5],[3,6]],[[1,4],[1,2]]), false);
//     });

//     it('return false if two arrays (of arrays) dont have duplicate elements and dont share any coordinate values', function () {
// 	assert.equal(isCollinear.hasDupes([[2,5],[3,7]],[[6,4],[8,1]]), false);
//     });
    
    
   
// });
	 
