import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import QuickMatch from './pages/QuickMatch';
import BookList from './pages/BookList';
import configureStore from './store/configureStore';
import { login } from './actions/users'; 

const store = configureStore();
// store.dispatch(login({userId: 1, userName: 'Javier'}));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        {/* The corresponding component will show here if the current URL matches the path */}
        <Route path="/" exact component={Home} />
        <Route path="/quickMatch" exact component={QuickMatch} />
        <Route path="/bookList" component={BookList} />
      </Provider>
    );
  }
}

export default App;