import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import booksReducer from '../reducers/books';

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
      user: userReducer,
      books: booksReducer
    }),
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    saveState({
      user: store.getState().user,
      books: store.getState().books
    });
  });
  return store;
}


