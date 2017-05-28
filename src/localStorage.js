export const saveState = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('todos', serialisedState);
  } catch (e) {
    // ignore write errors
  }
};

export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('todos');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (e) {
    return undefined;
  }
};
