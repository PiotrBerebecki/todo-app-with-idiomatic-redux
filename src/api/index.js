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
