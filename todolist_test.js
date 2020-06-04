/* eslint-disable max-lines-per-function */
const Todo = require("../lib/todo");
const todoList = require("../lib/todolist");

describe("TodoList", () => {
  let todo1, todo2, todo3, list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new todoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("calling toArray returns the list in array form", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("calling first returns the first todo item", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("calling last returns the last todo item", () => {
    expect(list.last()).toEqual(todo3);
  });

  test("calling shft removes first item in list and returns it", () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test("calling pop removes last item in list and returns it", () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone returns false if not all todos done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
    list.markUndoneAt(1);
    expect(list.isDone()).toBe(false);
  });

  test("add throws error when non todo item is added", () => {
    expect(() => list.add({ a: "flower" })).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
  });

  test("itemAt returns the item at given index", () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => {
      list.itemAt(23);
    }).toThrow(ReferenceError);
  });

  test("markDoneAt marks the item at given index done", () => {
    expect(() => list.markDoneAt(100)).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test("markUndoneAt marks the item at given index undone", () => {
    expect(() => list.markUndoneAt(100)).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo2.isDone()).toBe(true);
    list.markUndoneAt(1);
    expect(todo2.isDone()).toBe(false);
  });

  test("markAllDone marks all items done", () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });

  test("calling removeAt remotes item at given index", () => {
    expect(() => {
      list.removeAt(100);
    }).toThrow(ReferenceError);
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test("toString returns string representation of the list", () => {
    let string = ` ---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test("toString returns different string when all todos are done", () => {
    list.markAllDone();
    let string = ` ---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test("toString returns different string for done todo", () => {
    list.markDoneAt(1);
    let string = ` ---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test("forEach iterates over the elements in list", () => {
    list.forEach((el) => el.markDone());
    expect(list.isDone()).toBe(true);
  });

  test("filter iterates over the elements in list and filter", () => {
    todo2.markDone();
    const newList = list.filter((el) => el.isDone());
    expect(newList.toArray()).toEqual([todo2]);
  });
});
