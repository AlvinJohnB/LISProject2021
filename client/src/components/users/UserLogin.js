import React from 'react'
import { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

import logo from '../../images/stcamlogo.jpg'
import './users.css'
import host from '../../config.json'

function UserLogin() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[msg, setMsg] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const onSubmit = async () => {
        const data = { username, password }
        
        await axios.post(`http://${host.ip}:3001/auth/login`, data).then((response) => {

            if(response.data.msg){
                setMsg(response.data.msg);
            }else{
                localStorage.setItem("accessToken", response.data);
                setAuthState(prevAuthState => {
                    return { ...prevAuthState, status: true}
                  })
                history.push('/');
            }
        })
    }
    return (
        <div className="login-form-wrapper">
            <div className="form-wrapper">
                <div className="login-form">
                    <img src={logo} alt="logo" className="stcamlogo"/>
                    <h3>Laboratory Information System Login</h3>
                    <form>
                        
                    <p className="errormsg">{msg}</p>
                        <label >Username:</label><br />
                        <input 
                            type="text" 
                            id="form-field"
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <br />
                        <label>Password:</label><br />
                        <input 
                            type="password" 
                            id="form-field"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <br />
                        <input onClick={onSubmit} className="login-form-botton" type="button" value="Login" />
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default UserLogin
