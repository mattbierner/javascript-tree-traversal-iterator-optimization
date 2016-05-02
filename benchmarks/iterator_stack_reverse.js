/**
 * Simple iterator using stack in reverse order
 */
"use strict";

const DONE = { done: true };


function StackIterator(root) {
    this.stack = [root];
};

StackIterator.prototype.next = function () {
    const head = this.stack.pop();
    if (!head)
        return DONE;

    const children = head.children;
    if (children.length)
        this.stack.push.apply(this.stack, children);
    return head;
};

StackIterator.prototype[Symbol.iterator] = function () {
    return this;
};


module.exports = {
    name: "Iterator using stack (reverse order)",
    impl: root => new StackIterator(root)
};
