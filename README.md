# Javascript Tree Traversal Iterator Optimization 

A small benchmark comparing the performance of various methods of creating an ES6 iterator over a k-ary tree.

<div align="center" >
    <img src="https://raw.githubusercontent.com/mattbierner/javascript-tree-traversal-iterator-optimization/master/documentation/perf-chart.png" alt="Apep" />
</div>


### Usage

```bash
$ npm install
$ npm run benchmark
```

### Adding a new benchmark
All implementations are stored in `./benchmarks/`. To add a new one, simply create a new file that looks like this:

```js
"use strict";

module.exports = {
    name: "Benchmark name",
    impl: tree => /* create iterator here */
};
```

Then in `index.js`, add the iterator to the pre_benchmarks like so:

```js
const pre_benchmarks = [
    ...,
    iteratorTest(require('./benchmarks/my_new_benchmark'))
];
```

It will now be included in the test.

Trees are simply:

```js
function Node(value, children) {
    this.value = value;
    this.children = children;
};
```

where children is an array of child nodes.
