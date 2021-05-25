import React from 'react';
import './App.css';

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

      <div className="content">Hello world</div>

      </section>
      <footer>Laboratory Information System by Bregs</footer>
    </div>
  );
}

export default App;
