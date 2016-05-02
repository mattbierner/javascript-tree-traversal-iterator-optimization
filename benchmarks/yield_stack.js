/**
 * Flattens to a single yielding function using a stack. (pre order traversal)
 */
"use strict";

module.exports = {
    name: "Yield using stack",
    impl: function* (root) {
        const stack = [root];
        let head;
        while (head = stack.shift()) {
            const children = head.children;
            if (children.length)
                stack.unshift.apply(stack, children);
            yield head.value;
        }
    }
};
