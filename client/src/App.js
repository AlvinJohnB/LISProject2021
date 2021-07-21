import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Ptreg from './components/ptregistration/Ptreg';
import Ptsearch from "./components/ptsearch/Ptsearch";
import Searchresult from './components/ptsearch/Searchresult';
import Noptrecord from './components/ptsearch/Noptrecord';
import Updatept from './components/updatept/Updatept';
import Addorder from './components/addorder/Addorder';
import UserLogin from './components/users/UserLogin';
import UserReg from './components/users/UserReg';
import Orders from './components/orders/Orders';

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react'
import axios from 'axios';


const App = () => {

  const [authState, setAuthState] = useState("false");

useEffect(() => {
  axios.get("http://localhost:3001/auth/auth",{
    headers:{
      accessToken: localStorage.getItem("accessToken"),
    }
  }).then((response) => {
    if(response.data.error){
      setAuthState("false");
    }else{
      setAuthState("true");
    }
})
},[])

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Switch>
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserReg} />
            <div className="wrapper">

                  <header>
                    <div>logo</div>
                    <p>Welcome, {authState}. Log-out?</p>
                  </header>


              <nav>
                <li>
                    <ul><Link to="/ptsearch">Patient Search</Link></ul>
                    <ul><Link to="/registerpatient">Patient Registration</Link></ul>
                    <ul><Link to="/orders">Orders</Link></ul>
                    <ul>Laboratory</ul>
                    <ul>Results</ul>
                </li>
              </nav>
              <section>
                
                <Route path="/" exact component={Ptsearch} />
                <Route path="/ptsearch" component={Ptsearch} />
                <Route path="/registerpatient" component={Ptreg} />
                <Route path="/searchresults/:param" component={Searchresult}/>
                <Route path="/noptfound" component={Noptrecord}/>
                <Route path="/updatept/:pId" component={Updatept}/>
                <Route path="/addorder/for:pId" component={Addorder}/>
                <Route path="/orders" component={Orders}/>
              </section>
              <footer>Laboratory Information System by Bregs</footer>
              
            </div>
          </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
