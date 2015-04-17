var assert = require("assert");
var orbit = require("../orbit");

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

