
module.exports.checkPermutation = checkPermutation;
function checkPermutation(perm) {
	// check to see if the permutation is valid

	var image = [];
	for (var p in perm) {
		if (perm.hasOwnProperty(p)) {
			image.push(perm[p]);
		}
	}

	return image.every(function (p) {
		return perm.hasOwnProperty(p);
	});
}


module.exports.permutationsEqual = permutationsEqual;
function permutationsEqual(perm1, perm2) {
	return permInPerm(perm1, perm2) && permInPerm(perm2, perm1);
}

function permInPerm(perm1, perm2) {
	var image = [];
	for (var p in perm1) {
		if (perm1.hasOwnProperty(p)) {
			if (perm2[p] != perm1[p])
				return false;
		}
	}

	return true;
}

module.exports.cycleToPerm = cycleToPerm;
function cycleToPerm(cycle) {

	var last = false;
	var perm = {};
	cycle.forEach(function (i) {
		if (last) {
			perm[last] = i;
		}

		last = i;
	});

	perm[cycle[cycle.length - 1]] = cycle[0];
	return perm;
}

module.exports.composePermutations = composePermutations;
function composePermutations(perm1, perm2) {
	var composition = {};
	for (var p in perm2) {
		if (perm2.hasOwnProperty(p)) {
			var result = perm2[p];
			if (perm1.hasOwnProperty(result)) {
				// modified by perm1 and perm2
				composition[p] = perm1[perm2[p]];
			} else {
				// modified by perm2, left alone by perm1
				composition[p] = perm2[p];
			}
		}
	}

	// make sure we also get things in perm1 that are
	// left alone by perm2
	for (var p in perm1) {
		if (perm1.hasOwnProperty(p)) {
			if (!perm2.hasOwnProperty(p)) {
				composition[p] = perm1[p];
			}
		}
	}

	return composition;
}

module.exports.inverse = inverse;
function inverse(perm) {
	var toR = {};

	for (var p in perm) {
		if (perm.hasOwnProperty(p)) {
			toR[perm[p]] = p;
		}
	}

	return toR;
}

module.exports.isIdentity = isIdentity;
function isIdentity(perm) {
	for (var p in perm) {
		if (perm.hasOwnProperty(p)) {
			if (perm[p] != p) {
				return false;
			}
		}
	}

	return true;
}

module.exports.orbits = orbits;
function orbits(perm) {
	var orbits = [];
	var accountedFor = [];

	for (var p in perm) {
		if (perm.hasOwnProperty(p)) {
			if (accountedFor.indexOf(String(p)) != -1)
				continue; // already in a cycle

			var orbit = [];
			orbit.push(String(p));
			accountedFor.push(String(p));
			var j = perm[p];
			while (accountedFor.indexOf(String(j)) == -1) {
				orbit.push(String(j));
				accountedFor.push(String(j));
				j = perm[j];
			}
			orbits.push(orbit);
		}
	}

	return orbits;
}

module.exports.transpositionDecomposition = transpositionDecomposition;
function transpositionDecomposition(perm) {
	var orb = orbits(perm);
	var toR = [];
	
	orb.forEach(function (i) {
		//console.log("Decomposing orbit: " + i);
		toR.push(decomposeCycle(i));
	});

	
	var flatten = [];
	flatten = flatten.concat.apply(flatten, toR);
	return flatten;
}

function decomposeCycle(cycle) {
	var toR = [];
	cycle.forEach(function(elm, idx, ary) {
		if (idx == ary.length - 1)
			return;

		toR.push([elm, ary[idx + 1]]);
	});

	return toR;
}

