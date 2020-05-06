import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import QuickMatch from './pages/QuickMatch';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {/* The corresponding component will show here if the current URL matches the path */}
        <Route path="/" exact component={Home} />
        <Route path="/quickMatch" exact component={QuickMatch} />
      </div>
    );
  }
}

export default App;