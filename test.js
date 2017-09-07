const bloom = require('./lib/bloomfilter').default;

let B = new bloom(16, 8);
B.add("cat");
B.add("parrot");
B.add("Monkey");

console.log(B);

let dog = B.inSet("dog");
let cat = B.inSet("cat");

console.log("is 'dog' in the set?", dog);
console.log("is 'cat' in the set?", cat);
console.log("monkey?", B.inSet("Monkey"));


console.log("B.toString", B.toString());
