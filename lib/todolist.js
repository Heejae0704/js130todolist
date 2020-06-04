"use strict";

const Todo = require("./todo");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    } else {
      this.todos.push(todo);
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every((item) => item.isDone() === true);
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = ` ---- ${this.title} ----`;
    let list = this.todos.map((todo) => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach((todo) => callback(todo));
  }

  filter(callback) {
    const newList = new TodoList(this.title);
    this.forEach((todo) => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });
    return newList;
    // My original implementation
    // const newToDoList = Object.create(TodoList.prototype);
    // Object.assign(newToDoList, this);
    // newToDoList.todos = newToDoList.todos.filter((todo) => callback(todo));
    // return newToDoList;
  }

  findByTitle(title) {
    return this.filter((todo) => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }

  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;
