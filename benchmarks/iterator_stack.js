/**
 * Simple iterator using stack
 */
"use strict";

const DONE = { done: true };

const g = 0;
function StackIterator(root) {
    this.stack = [root];
};

StackIterator.prototype.next = function () {
    const head = this.stack.shift();
    if (!head)
        return DONE;

    const children = head.children;
    if (children.length)
        this.stack.unshift.apply(this.stack, children);
    return head;
};

StackIterator.prototype[Symbol.iterator] = function () {
    return this;
};


module.exports = {
    name: "Iterator using stack",
    impl: root => new StackIterator(root)
};
