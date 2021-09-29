import React from 'react'
import { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';


import './users.css'

function UserLogin() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[msg, setMsg] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const onSubmit = () => {
        const data = { username, password }
        
        axios.post("http://localhost:3001/auth/login", data).then((response) => {

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
                    <h1>Logo</h1>
                    <h3>Login</h3>
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
