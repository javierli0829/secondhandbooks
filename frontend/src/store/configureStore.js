import { createStore, combineReducers } from 'redux';
import usersReducer from '../reducers/users';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};


const persistedState = loadState();
export default () => {
  const store = createStore(
    combineReducers({
      users: usersReducer
    }),
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    saveState({
      users: store.getState().users
    });
  });
  return store;
}


