/**
 * Continuation based traversal with a few optimizations
 */
"use strict";

const noop = () => 0;

const visitChildren = (child, children, i, k) => {
    const next = children[i];
    return visit(child, next ? () => visitChildren(next, children, i + 1, k) : k);
};

const visit = (node, k) => {
    const children = node.children;
    const child = children[0];
    return {
        value: node.value,
        rest: child ? () => visitChildren(child, children, 1, k) : k || noop
    };
};

module.exports = {
    name: "Visit using continuations with optimizations",
    impl: (f, z, tree) => {
        for (let it = visit(tree); it; it = it.rest())
            z = f(z, it.value);
        return z;
    }
};
