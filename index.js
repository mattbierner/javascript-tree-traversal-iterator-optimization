"use strict";
const assert = require('assert');

/**
 * Basic k-ary tree
 */
function Node(value, children) {
    this.value = value;
    this.children = children;
};

/**
 * Generate a full free of `depth` with nodes counting up from 0
 */
const gen = (arity, depth, value = { value: 0 }) => {
    const node = new Node(value.value++, []);
    for (let i = 0; depth > 0 && i < arity; ++i)
        node.children.push(gen(arity, depth - 1, value));
    return node;
};


/* 
 ******************************************************************************/
const Benchmark = require('benchmark');

const value = { value: 0 };
const tree = gen(3, 8, value);
console.log(value);


const iteratorTest = (test) => {
    const impl = test.impl;
    return {
        name: test.name,
        impl: (f, z, tree) => {
            for (let x of impl(tree))
                z = f(z, x);
            return z;
        }
    }
};

/**
 * Pre order traversal benchmarks
 */
const pre_benchmarks = [
    iteratorTest(require('./benchmarks/yield')),
    iteratorTest(require('./benchmarks/yield_stack')),
    iteratorTest(require('./benchmarks/yield_modified_stack')),
    iteratorTest(require('./benchmarks/yield_list')),
    iteratorTest(require('./benchmarks/yield_modified_list')),

    iteratorTest(require('./benchmarks/iterator_stack')),
    iteratorTest(require('./benchmarks/iterator_modified_stack')),
    iteratorTest(require('./benchmarks/iterator_list')),
    iteratorTest(require('./benchmarks/iterator_modified_list')),

    require('./benchmarks/visit'),
    require('./benchmarks/visit_optimized'),
    require('./benchmarks/visit_appk'),
];

pre_benchmarks.forEach(c => {
    let i = 0;
    c.impl((a, b) => {
        assert(b == i++, c.name)
    }, 0, tree);
    assert(i == value.value, `sum failed ${c.name} ${i} ${value.value}`);
});

/**
 * Unordered traversal benchmarks to compare to.
 */
const unordered_benchmarks = [
    iteratorTest(require('./benchmarks/yield_stack_reverse')),
    
    iteratorTest(require('./benchmarks/iterator_stack_reverse'))
];

unordered_benchmarks.forEach(c => {
    let i = 0;
    c.impl(_ => ++i, 0, tree);
    assert(i == value.value, `sum failed ${c.name} ${i} ${value.value}`);
});

const benchmarks = [].concat(pre_benchmarks, unordered_benchmarks);

const results = new Map();

const suite = benchmarks.reduce(
    (p, c) => p.add(c.name, () => {
        const sum = c.impl((a, b) => a + b, 0, tree);
        results.set(c.name, sum);
    }),
    new Benchmark.Suite());

suite
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        for (let [name, result] of results)
            console.log(result + ' ' + name);
    })
    .run({ 'async': true });