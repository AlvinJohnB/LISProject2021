import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Ptreg from './components/ptregistration/Ptreg';
import Ptsearch from "./components/ptsearch/Ptsearch";

const App = () => {

  return (
    <Router>
      <Switch>
          <div className="wrapper">
            <header>
              <div>logo</div>
              <span>Welcome, user. Log-out?</span>
            </header>

            <nav>
              <li>
                  <ul><Link to="/ptsearch">Patient Search</Link></ul>
                  <ul><Link to="/registerpatient">Patient Registration</Link></ul>
                  <ul>Add Order</ul>
                  <ul>Orders</ul>
                  <ul>Laboratory</ul>
                  <ul>Results</ul>
              </li>
            </nav>
            <section>
              <Route path="/" exact component={Ptsearch} />
              <Route path="/ptsearch" component={Ptsearch} />
              <Route path="/registerpatient" component={Ptreg} />

            </section>
            <footer>Laboratory Information System by Bregs</footer>
            
          </div>
        </Switch>
    </Router>
  );
}

export default App;
