import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import Ptreg from './components/ptregistration/Ptreg';
import Ptsearch from "./components/ptsearch/Ptsearch";

const App = () => {

  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect( () => {
    axios.get("http://localhost:3001/patient").then((response) => {
      setListOfPatients(response.data);
    });
  }, []);



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
            <ul>Add Order</ul>
            <ul>Orders</ul>
            <ul>Laboratory</ul>
            <ul>Results</ul>
        </li>
      </nav>
      <section>
        
      <Ptreg />
      <Ptsearch />
      </section>
      <footer>Laboratory Information System by Bregs</footer>
      
    </div>
  );
}

export default App;
