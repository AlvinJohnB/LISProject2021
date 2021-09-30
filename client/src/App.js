import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Header from './components/Header';
import Ptreg from './components/ptregistration/Ptreg';
import Ptsearch from "./components/ptsearch/Ptsearch";
import Searchresult from './components/ptsearch/Searchresult';
import Noptrecord from './components/ptsearch/Noptrecord';
import Updatept from './components/updatept/Updatept';
import Addorder from './components/addorder/Addorder';
import UserLogin from './components/users/UserLogin';
import UserReg from './components/users/UserReg';
import Orders from './components/orders/Orders';
import OrderDetails from './components/orders/OrderDetails';
import LabClient from './components/laboratory/LabClient';
import ChemForm from './components/laboratory/chemistry/ChemForm';
import Hemaform from './components/laboratory/hema/Hemaform';
import Results from './components/results/Results'
import PrevTrx from './components/orders/PrevTrx'

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react'
import axios from 'axios';
import ResultForm from './components/results/ResultForm';


const App = () => {

  const [authState, setAuthState] = useState({name: "", username: "", id: 0, status: false});
  

useEffect(() => {
  axios.get("http://localhost:3001/auth/auth",{
    headers:{
      accessToken: localStorage.getItem("accessToken"),
    }
  }).then((response) => {
    if(response.data.error){
      //setAuthState({...authState, status: false});
      setAuthState(prevAuthState => {
        return { ...prevAuthState, status: false}
      })
    }else{
      setAuthState(() => {
        return { name: response.data.name, username: response.data.username, id: response.data.id, status: true}
      })
      //setAuthState({name: response.data.name, username: response.data.username, id: response.data.id, status: true});
    }
})
},[setAuthState])

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Switch>
            <Route path="/laboratory" exact component={LabClient} />
            <Route path="/laboratory/chemistry" exact component={ChemForm} />
            <Route path="/laboratory/hematology" exact component={Hemaform} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserReg} />
            <div className="wrapper">
              <Header />
              <nav>
                <li>
                    <ul><Link to="/ptsearch">Patient Search</Link></ul>
                    <ul><Link to="/registerpatient">Patient Registration</Link></ul>
                    <ul><Link to="/orders">Orders</Link></ul>
                    <ul><Link to="/laboratory">Laboratory</Link></ul>
                    <ul><Link to="/results">Results</Link></ul>
                </li>
              </nav>
              <section>
                
                <Route path="/" exact component={Ptsearch} />
                <Route path="/ptsearch" component={Ptsearch} />
                <Route path="/registerpatient" component={Ptreg} />
                <Route path="/searchresults/:param" component={Searchresult}/>
                <Route path="/noptfound" component={Noptrecord}/>
                <Route path="/updatept/:pId" component={Updatept}/>
                <Route path="/porders/:pId" component={PrevTrx}/>
                <Route path="/addorder/for:pId" component={Addorder}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/order/:labNumber" component={OrderDetails}/>
                <Route path="/results/" component={Results}/>
                <Route path="/resultform/" component={ResultForm}/>
              </section>
              <footer>Laboratory Information System by Bregs</footer>
              
            </div>
          </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
