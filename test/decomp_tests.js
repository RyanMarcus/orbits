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



describe("transportation decomposition", function () {
	it("should decompose an arbitrary permutation", function() {
		var p1 = {"a": "b", "b": "c", "c": "a"};
		var xps = orbit.transpositionDecomposition(p1);

		assert.equal(xps.length, 2);
		assert.equal(xps[0][0], 'a');
		assert.equal(xps[0][1], 'b');
		assert.equal(xps[1][0], 'b');
		assert.equal(xps[1][1], 'c');

	});


	it("should preserve a complex permutation", function () {
		var p1 = {"a": "b", "b": "c", 
			  "c": "d", "d": "a",
			  "f": "g", "g": "f"};

		var xps = orbit.transpositionDecomposition(p1);
		
		xps = xps.map(orbit.cycleToPerm)
			 .reduce(orbit.composePermutations);


		assert(orbit.permutationsEqual(p1, xps));
	});
});
