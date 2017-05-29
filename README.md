# Todo App with Idiomatic Redux

The todo app created while following Dan Abramov's [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) course:

Community notes available here: https://github.com/PiotrBerebecki/todo-app-with-idiomatic-redux/notes


# Notes:

- Modern browsers allow log grouping

```javascript
console.group(action.type);
console.log('%c prev state', 'color: gray', store.getState());
console.log('%c action', 'color: blue', action);
console.log('%c next state', 'color: green', store.getState());
console.groupEnd(action.type);
```
