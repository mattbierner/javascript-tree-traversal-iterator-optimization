/**
 * Continuation based traversal
 */
"use strict";

const visitChildren = (children, i, k) => {
    const child = children[i];
    if (!child)
        return k && k();
    return visit(child, () => visitChildren(children, i + 1, k));
};

const visit = (node, k) => {
    if (!node)
        return k && k();
    return {
        value: node.value,
        rest: () => visitChildren(node.children, 0, k)
    };
};

module.exports = {
    name: "Visit using continuations",
    impl: (f, z, tree) => {
        for (let it = visit(tree); it; it = it.rest())
            z = f(z, it.value);
        return z;
    }
};
