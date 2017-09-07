# bloom-filter [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![Greenkeeper badge](https://badges.greenkeeper.io/PolkaJS/bloom-filter.svg)](https://greenkeeper.io/)

[travis-image]: https://travis-ci.org/PolkaJS/bloom-filter.svg?branch=master
[travis-url]: https://travis-ci.org/PolkaJS/bloom-filter
[npm-image]: https://img.shields.io/npm/v/@polkajs/bloom-filter.svg
[npm-url]: https://npmjs.org/package/@polkajs/bloom-filter
[downloads-image]: https://img.shields.io/npm/dm/@polkajs/bloom-filter.svg
[downloads-url]: https://npmjs.org/package/@polkajs/bloom-filter

## About

Bloom filters can very quickly answer variations on the Yes/No question “is this item in the set?”, like “have I seen this item before?”

* [WIKI](https://en.wikipedia.org/wiki/Bloom_filter)
* [Bloom filters by example](https://llimllib.github.io/bloomfilter-tutorial/)
* [fun read about bloom filters and their value](https://blog.medium.com/what-are-bloom-filters-1ec2a50c68ff)
* [white paper](http://astrometry.net/svn/trunk/documents/papers/dstn-review/papers/bloom1970.pdf)
* [c++ example](http://blog.michaelschmatz.com/2016/04/11/how-to-write-a-bloom-filter-cpp/)

While bloom filters can give false positives, they cannot give false negatives. When

## Install
```js
// NPM
npm install --save @polkajs/bloom-filter
// YARN
yarn add @polkajs/bloom-filter
```

## Use
```js
const Bloom = require('@polkajs/bloom-filter').default;

let bloom = new Bloom(16, 8); // 16 byte length, assuming max 8 inputs
B.add("cat");
B.add("parrot");
B.add("monkey");

console.log(B);
// Bloom {
//   bitmapBits: 128,
//   k: 2,
//   bitmap: <Buffer 00 00 80 00 00 00 08 00 00 20 01 00 88 00 00 00>,
//   numHashes: 8,
//   hashFunc: [Function]
// }

let dog = B.inSet("dog");
let cat = B.inSet("cat");

console.log("is 'dog' in the set?", dog);
// false
console.log("is 'cat' in the set?", cat);
// true
console.log(B.toString());
// 00008000000008000020010088000000
```

## API

### new
create a new bloom
```
new Bloom(size: number, numHashes: number, hashFunc?: Function)
```
* **size**: number of bytes in bloom map
* **numHashes**: max number of inputs
* **hashFun**: [OPTIONAL] replace the murmurhash3 algorithm

### add
add a new input
```
bloom.add(data: string)
```
* **data**: input string to be mapped

### inSet
check if a value exists in the bloom filter set
```
bloom.inset(data: string): bool
```
* **data**: input string to be checked

### toString
hexadecimal string of the current mapping of inputs
```
bloom.toString(): string
```

### extendBloom
takes
```
bloom.extendBloom(b: Bloom): Bloom
```
* **b** bloom filter to extend from

---

## ISC License (ISC)

Copyright 2017 <PolkaJS>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
