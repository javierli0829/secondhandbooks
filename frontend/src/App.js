import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuickMatch from './pages/QuickMatch';
import BookList from './pages/BookList';
import Login from './pages/Login';
import Profile from './pages/Profile'
import configureStore from './store/configureStore';
import './styles/App.css'

const store = configureStore();
console.log(store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Router>
          {/* The corresponding component will show here if the current URL matches the path */}
          <Route path="/" exact component={Home} />
          <Route path="/quickMatch" exact component={QuickMatch} />
          <Route path="/bookList" component={BookList} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile}/>
        </Router>
        <Footer />
      </Provider>
    );
  }
}

export default App;