/**
 * Iterator using a linked list
 */
"use strict";

const DONE = { done: true };

function LinkedListIterator(root) {
    this.head = { node: root, rest: null };
};

LinkedListIterator.prototype.next = function () {
    const head = this.head;
    if (!head)
        return DONE;
    
    const children = head.node.children;
    for (let i = 0, len = children.length, r = head; i < len; ++i) {
        r = r.rest = { node: children[i], rest: r.rest };
    }
    this.head = this.head.rest;
    return head.node;
};

LinkedListIterator.prototype[Symbol.iterator] = function () {
    return this;
};

module.exports = {
    name: "Iterator using linked list",
    impl: root => new LinkedListIterator(root)
};
