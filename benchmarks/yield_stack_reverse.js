/**
 * Reversal traversal stack.
 */
"use strict";

module.exports = {
    name: "Yield using stack (reverse order)",
    impl: function* (root) {
        const stack = [root];
        let head;
        while (head = stack.pop()) {
            const children = head.children;
            if (children.length)
                stack.push.apply(stack, children);
            yield head.value;
        }
    }
};
