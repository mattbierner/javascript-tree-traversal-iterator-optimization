/**
 * Flattens to a single yielding function using a stack. (pre order traversal)
 */
"use strict";

module.exports = {
    name: "Yield using linked list",
    impl: function* (root) {
        for (let head = { node: root, rest: null }; head; head = head.rest) {
            const children = head.node.children;
            for (let i = 0, len = children.length, r = head; i < len; ++i) {
                r = r.rest = { node: children[i], rest: r.rest };
            }
            yield head.node.value;
        }
    }
};
