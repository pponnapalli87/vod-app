import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import History from './components/History';
import Home from './components/HomeContainer';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/history" component={History} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
