// Copyright 2015 Ryan Marcus
// This file is part of orbits.
// 
// orbits is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// orbits is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with orbits.  If not, see <http://www.gnu.org/licenses/>.


var assert = require("assert");
var orbit = require("../orbits");

describe("permutation functions", function () {
    describe("check function", function () {
	describe("on valid permutations", function() {
	    it("should validate the permutation created by a cycle", function() {
		var cycle = ["a", "b", "c"];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });
	    
	    it("should validate the permutation created by a cycle", function() {
		var cycle = ["a", "b"];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });
	    
	    it("should validate the permutation created by a cycle", function() {
		var cycle = ["a"];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });
	    
	    it("should validate the permutation created by an empty cycle", function() {
		var cycle = [];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });
	    
	    it("should validate the permutation created by a cycle", function() {
		var cycle = ["a", "b", "c", "1", "2", "3"];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });
	    
	    it("should validate the permutation created by a cycle", function() {
		var cycle = ["a", "b", "c", "1", "2", "3", "7", "asdf"];
		assert.ok(orbit.checkPermutation(orbit.cycleToPerm(cycle)));
	    });

	    it("should validate an arbitrary permutation", function() {
		var cycle = {"a": "b", "b": "c", "c": "a"};
		assert.ok(orbit.checkPermutation(cycle));
	    });
	});

	describe("on invalid permutation", function () {
	    it ("should fail to validate a mapping where the image is not a subset of the domain", function () {
		var cycle = {"a": "b", "b": "c", "c": "d"};
		assert(!orbit.checkPermutation(cycle));
		
	    });

	    it ("should fail to validate a mapping where the image is not a subset of the domain", function () {
		var cycle = {"a": "b", "b": "aa", "c": "a"};
		assert(!orbit.checkPermutation(cycle));
		
	    });

	    it ("should fail to validate a mapping where the image is not a subset of the domain", function () {
		var cycle = {"a": "b"};
		assert(!orbit.checkPermutation(cycle));
		
	    });

	    it ("should fail to validate a mapping where the domain is not a subset of the image", function () {
		var cycle = {"a": "b", "c": "a"};
		assert(!orbit.checkPermutation(cycle));
		
	    });
	});
    });

    describe("equality function", function () {
	it("should correctly equate two arbitrary permutations", function () {
	    var cycle1 = {"a": "b", "b": "c", "c": "a"};
	    var cycle2 = {"a": "b", "b": "c", "c": "a"};
	    assert(orbit.permutationsEqual(cycle1, cycle2));
	});

	it("should correctly equate two arbitrary permutations", function () {
	    var cycle1 = {"a": "g", "g": "a", "c": "c"};
	    var cycle2 = {"a": "g", "g": "a", "c": "c"};
	    assert(orbit.permutationsEqual(cycle1, cycle2));
	});

	it("should correctly equate two empty", function () {
	    var cycle1 = {};
	    var cycle2 = {};
	    assert(orbit.permutationsEqual(cycle1, cycle2));
	});

	it("should correctly equate two cycles", function () {
	    var cycle1 = [1, 2, 3, 4];
	    var cycle2 = [1, 2, 3, 4];
	    assert(orbit.permutationsEqual(orbit.cycleToPerm(cycle1),
					   orbit.cycleToPerm(cycle2)));
	});

	it("should correctly equate two cycles", function () {
	    var cycle1 = [4, 1, 2, 3];
	    var cycle2 = [1, 2, 3, 4];
	    assert(orbit.permutationsEqual(orbit.cycleToPerm(cycle1),
					   orbit.cycleToPerm(cycle2)));
	});

	it("should correctly equate two cycles", function () {
	    var cycle1 = [4, 1, 2, 3];
	    var cycle2 = [3, 4, 1, 2];
	    assert(orbit.permutationsEqual(orbit.cycleToPerm(cycle1),
					   orbit.cycleToPerm(cycle2)));
	});

	it("should correctly differentiate two arbitrary cycles", function () {
	    var cycle1 = [4, 1, 6, 3];
	    var cycle2 = [3, 4, 1, 2];
	    assert(!orbit.permutationsEqual(orbit.cycleToPerm(cycle1),
					    orbit.cycleToPerm(cycle2)));
	});

	it("should correctly differentiate two arbitrary cycles", function () {
	    var cycle1 = [4, 1, 6, 3];
	    var cycle2 = [9, 4, 1, 2];
	    assert(!orbit.permutationsEqual(orbit.cycleToPerm(cycle1),
					    orbit.cycleToPerm(cycle2)));
	});

	it("should correctly differentiate two arbitrary invalid permutations", function () {
	    var cycle1 = {"a": "b", "b": "c", "c": "a"};
	    var cycle2 = {"a": "b", "b": "c", "c": "d"};
	    assert(!orbit.permutationsEqual(cycle1, cycle2));
	});

	it("should correctly differentiate two arbitrary invalid permutations", function () {
	    var cycle1 = {"a": "b", "z": "c", "c": "a"};
	    var cycle2 = {"a": "b", "b": "c", "c": "d"};
	    assert(!orbit.permutationsEqual(cycle1, cycle2));
	});

	it("should correctly differentiate two arbitrary valid permutations", function () {
	    var cycle1 = {"a": "b", "b": "c", "c": "a"};
	    var cycle2 = {"a": "b", "b": "c", "c": "a", "d": "d"};
	    assert(!orbit.permutationsEqual(cycle1, cycle2));
	});
	
	it("should correctly differentiate two arbitrary invalid permutations", function () {
	    var cycle1 = {"a": "b", "b": "c", "c": "a", "d": "a"};
	    var cycle2 = {"a": "b", "b": "c", "c": "a", "d": "d"};
	    assert(!orbit.permutationsEqual(cycle1, cycle2));
	});
    });

    describe("composition function", function () {
	it("should correctly compose two disjoint cycles", function() {
	    var cycle1 = [1, 2, 3];
	    var cycle2 = [5, 6, 7];
	    
	    var comp = orbit.composePermutations(orbit.cycleToPerm(cycle1),
						 orbit.cycleToPerm(cycle2));

	    assert(orbit.permutationsEqual(comp,
					   { '1': 2, '2': 3, '3': 1, 
					     '5': 6, '6': 7, '7': 5 }));
	});

	it("should correctly compose two partially disjoint cycles", function() {
	    var cycle1 = [1, 2, 3];
	    var cycle2 = [3, 4, 5];
	    
	    var comp = orbit.composePermutations(orbit.cycleToPerm(cycle1),
						 orbit.cycleToPerm(cycle2));
	    
	    assert(orbit.permutationsEqual(comp,
					   { '1': 2, '2': 3, 
					     '3': 4, '4': 5, 
					     '5': 1 }));
	});

	it("should correctly compose two non-disjoint cycles", function() {
	    var cycle1 = [1, 2, 3];
	    var cycle2 = [1, 2, 3];
	    
	    var comp = orbit.composePermutations(orbit.cycleToPerm(cycle1),
						 orbit.cycleToPerm(cycle2));
	    
	    assert(orbit.permutationsEqual(comp,
					   { '1': 3, '2': 1, 
					     '3': 2 }));
	});

	it("should correctly compose two inverse cycles", function() {
	    var cycle1 = [1, 2, 3];
	    var cycle2 = [3, 2, 1];
	    
	    var comp = orbit.composePermutations(orbit.cycleToPerm(cycle1),
						 orbit.cycleToPerm(cycle2));
	    
	    assert(orbit.permutationsEqual(comp,
					   { '1': 1, '2': 2, 
					     '3': 3 }));
	});
    });


    describe("inverse function", function() {
	it("should correctly invert an arbitrary permutation", function () {
	    var p1 = {"a": "b", "b": "c", "c": "a"};
	    var p2 = {"a": "c", "b": "a", "c": "b"};

	    assert(orbit.permutationsEqual(orbit.inverse(p1), p2));
	});

	it("should correctly invert an arbitrary permutation (double invert)", function () {
	    var p1 = {"a": "b", "b": "c", "c": "a"};
	    assert(orbit.permutationsEqual(p1, orbit.inverse(orbit.inverse(p1))));
	});

	it("should correctly invert an arbitrary permutation (double invert)", function () {
	    var cycle1 = [1, 2, 3];
	    var p1 = orbit.cycleToPerm(cycle1);
	    assert(orbit.permutationsEqual(p1, orbit.inverse(orbit.inverse(p1))));
	});

    });

    describe("isIdentity()", function () {
	it("should correctly identify an arbitrary identity", function () {
	    var p1 = {"a": "a", "b": "b"};
	    assert(orbit.isIdentity(p1));
	});

	it("should correctly identify a perm compsoed with its inverse", function () {
	    var p1 = {"a": "b", "b": "c", "c": "a"};
	    assert(orbit.isIdentity(orbit.composePermutations(p1, orbit.inverse(p1))));
	});

	it("should correctly identify a perm compsoed with its inverse", function () {
	    var cycle1 = [1, 2, 3, 4];
	    var p1 = orbit.cycleToPerm(cycle1);
	    assert(orbit.isIdentity(orbit.composePermutations(p1, orbit.inverse(p1))));
	});

	it("should correctly identify a perm compsoed with its inverse", function () {
	    var cycle1 = [1, 2, 3, 4];
	    var cycle2 = [5, 2, 9, 4];
	    var p1 = orbit.composePermutations(orbit.cycleToPerm(cycle1),
					       orbit.cycleToPerm(cycle2));
	    assert(orbit.isIdentity(orbit.composePermutations(p1, orbit.inverse(p1))));
	});

	it("should correctly identify a perm compsoed with its inverse", function () {
	    var cycle1 = [1, 2, 3, "a", 4, "d"];
	    var cycle2 = [5, 2, 9, 4];
	    var p1 = orbit.composePermutations(orbit.cycleToPerm(cycle1),
					       orbit.cycleToPerm(cycle2));
	    assert(orbit.isIdentity(orbit.composePermutations(p1, orbit.inverse(p1))));
	});

        it("should identify when a permutation isn't an identity", function() {
            var cycle1 = [1, 2];
            assert(!orbit.isIdentity(orbit.cycleToPerm(cycle1)));
        });
        
    });

   
});
