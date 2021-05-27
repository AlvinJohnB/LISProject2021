import React from 'react';

import './App.css';

import Ptreg from './components/ptregistration/Ptreg';

const App = () => {
  return (
    <div className="wrapper">
      <header>
        <div>logo</div>
        <span>Welcome, user. Log-out?</span>
      </header>

      <nav>
        <li>
            <ul>Patient Search</ul>
            <ul>Patient Registration</ul>
            <ul>Orders</ul>
            <ul>Laboratory</ul>
            <ul>Results</ul>
        </li>
      </nav>
      <section>
        
      <Ptreg />

      </section>
      <footer>Laboratory Information System by Bregs</footer>
    </div>
  );
}

export default App;
