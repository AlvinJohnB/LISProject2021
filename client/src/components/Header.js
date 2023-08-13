import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import './ptregistration/ptreg.css'
import logo from '../images/stcamlogo.jpg'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import host from '../config.json'

function Header() {
  let history = useHistory();
    const {setAuthState, authState} = useContext(AuthContext);

    useEffect( async () => {
      await axios.get(`http://${host.ip}:3001/auth/auth`,{
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((response) => {
        if(response.data.error){
          setAuthState(prevAuthState => {
            return { ...prevAuthState, status: false}
          })
        }else{
          setAuthState(() => {
            return { name: response.data.name, username: response.data.username, id: response.data.id, status: true}
          })
        }
    })
    },[setAuthState])

    const logOut = () => {
      localStorage.removeItem("accessToken")
      setAuthState({...authState, status: false});
      history.push('/login');
    }
    return (
      <header className='bg-white d-flex p-2 border rounded-top justify-content-between'> 
        <div><img src={logo} alt="Logo" width="75px" /><br />{host.branch}</div>
        <div className="text-end">
        {authState.status === true && <p>Welcome, {authState.name}.<br /><strong><a href="/login" className="logOut" onClick={logOut}>Log-out?</a></strong></p>}
        {authState.status === false && <p>Welcome! Please log-in!</p>}</div>
      </header>
    )
}

export default Header
