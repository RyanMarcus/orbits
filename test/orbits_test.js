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

describe("orbit finder", function() {
    it("should find the orbits of an arbitrary permutation", function () {
	var p1 = {"a": "b", "b": "a", "c": "c"};
	var orbits = orbit.orbits(p1);

	assert.equal(orbits.length, 2);

	var composed = orbit.composePermutations(orbit.cycleToPerm(orbits[0]),
						 orbit.cycleToPerm(orbits[1]));

	assert(orbit.permutationsEqual(composed, p1));

	
    });

    it("should find the orbits of an arbitrary permutation", function () {
	var p1 = {"a": "b", "b": "c", "c": "a"};
	var orbits = orbit.orbits(p1);
	assert.equal(orbits.length, 1);
	assert(orbit.permutationsEqual(p1, orbit.cycleToPerm(orbits[0])));
    });


    it("should find the orbits of an arbitrary combined cycles", function () {
	var cycle1 = [1, 2, 3];
	var cycle2 = [4, 5, 6];
	var cycle3 = [7, 8, 9];

	var composed = orbit.composePermutations(orbit.cycleToPerm(cycle1),
						 orbit.cycleToPerm(cycle2));

	composed = orbit.composePermutations(composed,
					     orbit.cycleToPerm(cycle3));

	var orbits = orbit.orbits(composed);
	assert.equal(orbits.length, 3);

    });
});

