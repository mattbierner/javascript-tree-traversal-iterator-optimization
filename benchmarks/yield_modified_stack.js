/**
 * Yield using stack that does not push leaf nodes
 */
"use strict";

module.exports = {
    name: "Yield using modified stack",
    impl: function* (root) {
        const stack = [{ children: [root], i: 0 }];
        var head;
        while (head = stack[0]) {
            const node = head.children[head.i++];
            if (node) {
                const children = node.children;
                if (children.length)
                    stack.unshift({ children: children, i: 0 });
                yield node.value;
            } else {
                stack.shift();
            }
        }
    }
};
