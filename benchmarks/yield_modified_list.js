/**
 * Yield using a linked list without leaf nodes
 */
"use strict";

module.exports = {
    name: "Yield using modified list",
    impl: function* (root) {
        let head = { children: [root], i: 0, rest: null }
        while (head) {
            const child = head.children[head.i++];
            if (child) {
                const children = child.children;
                if (children.length) {
                    head = { children: children, i: 0, rest: head };
                }
                yield child.value;
            } else {
                head = head.rest
            }
        }
    }
};
