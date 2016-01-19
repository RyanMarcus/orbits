[ ![Codeship Status for RyanMarcus/orbit](https://www.codeship.io/projects/cd23dd10-36c9-0132-5705-2a2ee4030446/status)](https://www.codeship.io/projects/41501) [![Dependency Status](https://david-dm.org/ryanmarcus/orbits.svg)](https://david-dm.org/ryanmarcus/orbits) [![Coverage Status](https://coveralls.io/repos/github/RyanMarcus/orbits/badge.svg?branch=master)](https://coveralls.io/github/RyanMarcus/orbits?branch=master) [![Code Climate](https://codeclimate.com/github/RyanMarcus/orbits/badges/gpa.svg)](https://codeclimate.com/github/RyanMarcus/orbits)

A library for manipulating arbitrary permutations. It is capable of:

  * testing if a permutation is valid (`checkPermutation`)
  * testing if two permutations are equal (`permutationsEqual`)
  * converting from cycle to permutation (`cycleToPerm`)
  * composing permutations (`composePermutations`)
  * inverting permutations (`inverse`)
  * checking if a permutation is an identity permutation (`isIdentity`)
  * calculating the orbits of a permutation (`orbits`)
  * decomposing a permutation into transpositions (`transpositionDecomposition`)


Permutations are represented as objects, so that that this permutation:

    /  1  2  3  4  5 \
    \  2  3  4  5  1 /

.. is represented as:

    var p1 = { "1" : "2", "2": "3", "3": "4", "4": "5", "5": "1" }

Cycles are represented as lists, so that this cycle:

    (12345)

... is represented as:

	var o1 = ["1", "2", "3", "4", "5"];

## Cycle to Permutation
You can convert a cycle to a permutation.

    > var o = require('orbits')
    > var p1 = { "1" : "2", "2": "3", "3": "4", "4": "5", "5": "1" }
    undefined
    > var o1 = ["1", "2", "3", "4", "5"];
    undefined
    > o.permutationsEqual(p1, o.cycleToPerm(o1));
    true
    >

## Inverse

You can also calculate the inverse of a permutation.

    > o.inverse(p1);
    { '1': '5', '2': '1', '3': '2', '4': '3', '5': '4' }
    > o.inverse(o.cycleToPerm(o1));
    { '1': '5', '2': '1', '3': '2', '4': '3', '5': '4' }


## Orbits
Given another permutation,

    var p2 = {"a": "b", "b": "c", "c": "a", "d": "e", "e": "d"};

You can decompose `p2` into orbits:

    > o.orbits(p2);
    [ [ 'a', 'b', 'c' ], [ 'd', 'e' ] ]

## Composing permutations

You can compose `p1` and `p2`:

    > var p3 = o.composePermutations(p1, p2);
    undefined
    > p3
    { '1': '2',
      '2': '3',
      '3': '4',
      '4': '5',
      '5': '1',
      a: 'b',
      b: 'c',
      c: 'a',
      d: 'e',
      e: 'd' }
    >

And then compose `p3` with itself:

    > o.composePermutations(p3, p3);
    { '1': '3',
      '2': '4',
      '3': '5',
      '4': '1',
      '5': '2',
      a: 'c',
      b: 'a',
      c: 'b',
      d: 'd',
      e: 'e' }

## Transposition Decomposition

We can decompose `p3` into transpositions.

    > o.transpositionDecomposition(p3);
    [ [ '1', '2' ],
      [ '2', '3' ],
      [ '3', '4' ],
      [ '4', '5' ],
      [ 'a', 'b' ],
      [ 'b', 'c' ],
      [ 'd', 'e' ] ]


## License
> orbits  is free software: you can redistribute it and/or modify
> it under the terms of the GNU Affero General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
> 
> orbits is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU Affero General Public License for more details.
> 
> You should have received a copy of the GNU Affero General Public License
> along with orbits.  If not, see <http://www.gnu.org/licenses/>.
