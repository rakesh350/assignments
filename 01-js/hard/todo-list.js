/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(indexOfTodo) {
    if (this.todos[indexOfTodo] !== undefined) {
      this.todos.splice(indexOfTodo, 1);
    }
  }

  update(index, updatedTodo) {
    if (this.todos[index] !== undefined) {
      this.todos[index] = updatedTodo;
    }
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if (this.todos[indexOfTodo] !== undefined) {
      return this.todos[indexOfTodo];
    } 
    return null;
  }

  clear() {
    this.todos = [];
  }
}

// let todayTodo = new Todo();
// todayTodo.add("SES Document Components 50%");
// todayTodo.add("Spatial Index V2 20%");
// todayTodo.add("Send data from EAM to ODS");
// todayTodo.add("Send data from ISU to ODS");
// todayTodo.add("Review the two pending items for Schema comparison");
// console.log(todayTodo.getAll());
// todayTodo.remove(4);
// console.log(todayTodo.getAll());
// todayTodo.update(1, "Spatial Index V2 30%");
// console.log(todayTodo.getAll());

module.exports = Todo;
