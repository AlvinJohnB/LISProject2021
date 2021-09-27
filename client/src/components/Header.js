import React from 'react'
import { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios'
import './ptregistration/ptreg.css'
import logo from '../images/stcamlogo.jpg'
import {useHistory} from 'react-router-dom'

function Header() {
  let history = useHistory();
    const {setAuthState, authState} = useContext(AuthContext);
    
    useEffect(() => {
      axios.get("http://localhost:3001/auth/auth",{
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((response) => {
        if(response.data.error){
          setAuthState({...authState, status: false});
        }else{
          setAuthState({name: response.data.name, username: response.data.username, id: response.data.id, status: true});
        }
    })
    },[authState])

    const logOut = () => {
      localStorage.removeItem("accessToken")
      setAuthState({...authState, status: false});
      history.push('/login');
    }
    return (
      <header>
        <div><img src={logo} alt="Logo" width="75px" /><br />St. Camillus de Lellis General Hospital</div>
        <div className="userDiv">
        {authState.status === true && <p>Welcome, {authState.name}. <p className="logOut" onClick={logOut}>Log-out?</p></p>}
        {authState.status === false && <p>Welcome! Please log-in!</p>}</div>
      </header>
    )
}

export default Header
