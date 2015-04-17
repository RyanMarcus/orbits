var assert = require("assert");
var orbit = require("../orbit");



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
