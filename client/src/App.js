import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import host from './config.json'
import Header from './components/Header';
import Ptreg from './components/ptregistration/Ptreg';
import Ptsearch from "./components/ptsearch/Ptsearch";
import Searchresult from './components/ptsearch/Searchresult';
import Updatept from './components/updatept/Updatept';
import Addorder from './components/addorder/Addorder';
import UserLogin from './components/users/UserLogin';
import UserReg from './components/users/UserReg';
import Orders from './components/orders/Orders';
import OrderDetails from './components/orders/OrderDetails';
import LabClient from './components/laboratory/LabClient';
import ChemForm from './components/laboratory/chemistry/ChemForm';
import Hemaform from './components/laboratory/hema/Hemaform';
import Results from './components/results/Results';
import PrevTrx from './components/orders/PrevTrx';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react'
import axios from 'axios';
import ResultFormA4 from './components/results/ResultFormA4';
import Cmform from './components/laboratory/cm/CmForm';
import Seroform from './components/laboratory/sero/Seroform';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../src/images/background.jpg'

const bgStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'auto',
  height: '100vh',
  overflow: 'auto'
}

const App = () => {

  const [authState, setAuthState] = useState({name: "", username: "", id: 0, status: false});
  

useEffect(() => {
  axios.get(`http://${host.ip}:3001/auth/auth`,{
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
            <Route path="/laboratory/cm" exact component={Cmform} />
            <Route path="/laboratory/sero" exact component={Seroform} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/register" exact component={UserReg} />
            <div style={bgStyle}>
              
              <div className="container pt-5">
                <Header />
                <nav className='bg-success position-sticky'>
                  <ul className='d-flex'>
                      <li><Link to="/ptsearch">Patient Search</Link></li>
                      <li><Link to="/registerpatient">Patient Registration</Link></li>
                      <li><Link to="/orders">Orders</Link></li>
                      <li><Link to="/laboratory">Laboratory</Link></li>
                      <li><Link to="/results">Results</Link></li>
                  </ul>
                </nav>
                <section className='bg-light p-1'>
                  <Route path="/" exact component={Ptsearch} />
                  <Route path="/ptsearch" component={Ptsearch} />
                  <Route path="/registerpatient" component={Ptreg} />
                  <Route path="/searchresults/:param" component={Searchresult}/>
                  <Route path="/updatept/:pId" component={Updatept}/>
                  <Route path="/porders/:pId" component={PrevTrx}/>
                  <Route path="/addorder/for:pId" component={Addorder}/>
                  <Route path="/orders" component={Orders}/>
                  <Route path="/order/:labNumber" component={OrderDetails}/>
                  <Route path="/results/" component={Results}/>
                  <Route path="/resultform/" component={ResultFormA4}/>
                </section>
                <footer className='p-1 mb-5 rounded-bottom'>{host.version}</footer>
                
              </div>
            </div>
          </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
