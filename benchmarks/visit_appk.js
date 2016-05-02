/**
 * Continuation based traversal
 */
"use strict";

const appk = (k) =>
    k && visitChildrenA(k.child, k.children, k.i, k.k);

const visitChildrenA = (child, children, i, k) => {
    const next = children[i];
    return visitA(child, next ? {child: next, children, i: i + 1, k} : k);
};

const visitA = (node, k) => {
    const children = node.children;
    const child = children[0];
    return {
        value: node.value,
        rest: child ? {child, children, i: 1, k} : k
    };
};

module.exports = {
    name: "Visit using defunctionalized continuations",
    impl: (f, z, tree) => {
        for (let it = visitA(tree); it; it = appk(it.rest))
            z = f(z, it.value);
        return z;
    }
};
