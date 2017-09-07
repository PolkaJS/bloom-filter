// @flow
// import siphash from 'siphash';
import murmur from 'murmurhash3';
import bigNum from 'bignumber.js';

export default class Bloom {
  bitmap:     Buffer;   // the map itself (Buffer - memory efficient)
  bitmapBits: number;   // Total size of the bitmap
  k:          number;   // The number of hashes necessary to avoid collisions
  numHashes:  number;   // number of hashes you think you are going to add
  hashFunc:   Function; // The function to hash the data (default: murmurhash3)
  constructor(size: number, numHashes: number, hashFunc?: Function) {
    if (size < 0 || numHashes < 0) throw "Invalid parameters";

    this.bitmapBits = size * 8;
    this.k          = Math.ceil(size / numHashes * Math.log(2)) || 1;
    this.bitmap     = Buffer.alloc(size);
    this.numHashes  = numHashes;
    this.hashFunc   = (hashFunc) ? hashFunc : murmur.murmur128HexSync;
  }

  // join two bloom filters
  extendBloom(a: Bloom, b: Bloom): Bloom {
    let c = (a.bitmapBits > b.bitmapBits) ? b.bitmapBits : a.bitmapBits;

    for (let i = 0; i < c / 8; i++) {
      a.bitmap[i] |= b.bitmap[i];
    }
    return a;
  }

  // litte endian encoded
  add(data: string) {
    let hash = this.hashFunc(data);
    for (let i = 0; i < this.k; i++) {
      let num = this.nthHash(
        i,
        new bigNum(hash.slice(0, Math.floor(hash.length / 2)), 16),
        new bigNum(hash.slice(Math.floor(hash.length / 2)), 16),
        this.bitmapBits
      );
      this.bitmap[Math.floor(num / 8)] |= Math.pow(2, 7 - num % 8);
    }
  }

  inSet(data: string): bool {
    let hash = this.hashFunc(data);
    for (let i = 0; i < this.k; i++) {
      let num = this.nthHash(
        i,
        new bigNum(hash.slice(0, Math.floor(hash.length / 2)), 16),
        new bigNum(hash.slice(Math.floor(hash.length / 2)), 16),
        this.bitmapBits
      );
      if (!(this.bitmap[Math.floor(num / 8)] && Math.pow(2, 7 - num % 8)))
        return false;
    }
    return true;
  }

  // TODO: (number of set bits) / (total number of bits)
  // saturation(): number {
  //
  //   return  / this.bitmapBits;
  // }

  toString(): string {
    return this.bitmap.toString('hex');
  }

  nthHash(n: number, hashA: bigNum, hashB: bigNum, filterSize: number): bigNum {
    return hashA.mul(hashB.add(n)).mod(filterSize);
  }
}

function getOptimalK(bitmapSize: number, itemsCount: number): number {
  let k_num = Math.ceil(bitmapSize / itemsCount * Math.log(2));
  return Math.max(k_num, 1);
}
