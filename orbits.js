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
	for (var p in perm1) {
		if (perm1.hasOwnProperty(p)) {
			if (perm2[p] != perm1[p]) return false;
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
	for (var p2 in perm1) {
		if (perm1.hasOwnProperty(p2)) {
			if (!perm2.hasOwnProperty(p2)) {
				composition[p2] = perm1[p2];
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
	var toR = [];
	var accountedFor = [];

	for (var p in perm) {
		if (perm.hasOwnProperty(p)) {
			// already in a cycle
			if (accountedFor.indexOf(String(p)) != -1) continue; 

			var orbit = [];
			orbit.push(String(p));
			accountedFor.push(String(p));
			var j = perm[p];
			while (accountedFor.indexOf(String(j)) == -1) {
				orbit.push(String(j));
				accountedFor.push(String(j));
				j = perm[j];
			}
			toR.push(orbit);
		}
	}

	return toR;
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
		if (idx == ary.length - 1) return;

		toR.push([elm, ary[idx + 1]]);
	});

	return toR;
}

