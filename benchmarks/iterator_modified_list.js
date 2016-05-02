/**
 * Iterator using a linked list that does not push leaf nodes.
 */
"use strict";

const DONE = { done: true };


function ModifiedListIterator(root) {
    this.head = {children: [root], i: 0, rest: null};
};

ModifiedListIterator.prototype.next = function () {
    while (this.head) {
        const child = this.head.children[this.head.i++];
        if (child) {
            const children = child.children;
            if (children.length) {
                this.head = { children: children, i: 0, rest: this.head };
            }
            return child;
        }
        this.head = this.head.rest;
    }
    return DONE;
};

ModifiedListIterator.prototype[Symbol.iterator] = function () {
    return this;
};


module.exports = {
    name: "Iterator using modified linked list",
    impl: root => new ModifiedListIterator(root)
};
