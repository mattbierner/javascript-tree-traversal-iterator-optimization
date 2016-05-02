/**
 * Most simple tree traversal using yield and yield*.
 */
"use strict";

module.exports = {
    name: "Yield",
    impl: function* impl(root) {
        yield root.value;
        const children = root.children;
        for (let i = 0, len = children.length; i < len; ++i)
            yield* impl(children[i]);
    }
};
