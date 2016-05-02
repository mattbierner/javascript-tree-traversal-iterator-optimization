/**
 * Iterator using stack that does not push leaf nodes
 */
"use strict";

const DONE = { done: true };


function ModifiedStackIterator(root) {
    this.stack = [{ children: [root], i: 0 }];
};

ModifiedStackIterator.prototype.next = function () {
    var head;
    while (head = this.stack[0]) {
        const node = head.children[head.i++];
        if (node) {
            const children = node.children;
            if (children.length)
                this.stack.unshift({ children: children, i: 0 });
            return node;
        }
        this.stack.shift();
    }
    return DONE;
};

ModifiedStackIterator.prototype[Symbol.iterator] = function () {
    return this;
};

module.exports = {
    name: "Iterator using modified stack",
    impl: root => new ModifiedStackIterator(root)
};
