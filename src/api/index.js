import uuid from 'uuid/v4';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [
    {
      id: uuid(),
      text: 'hey',
      isCompleted: true,
    },
    {
      id: uuid(),
      text: 'ho',
      isCompleted: true,
    },
    {
      id: uuid(),
      text: 'let’s go',
      isCompleted: false,
    },
  ],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(1000).then(() => {
    if (Math.random() > 0.5) {
      throw new Error('BoomErr!');
    }

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.isCompleted);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.isCompleted);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: uuid(),
      text,
      isCompleted: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
