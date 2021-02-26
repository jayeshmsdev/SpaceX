import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/:id" component={LandingPage} />
      
      </Switch>
    </Router>
  );
}

export default App;
