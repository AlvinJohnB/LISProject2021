import React from 'react'
import { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

import logo from '../../images/stcamlogo.jpg'
import host from '../../config.json'
import background from '../../images/background.jpg'

function UserLogin() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[msg, setMsg] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const bgStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'auto'
      }

    const onSubmit = async (e) => {
        e.preventDefault()
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
        <div style={bgStyle}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col col-md-4 bg-white mt-5 p-4 rounded border border-dark d-flex flex-column justify-content-center">
                    <img src={logo} alt="logo" className="w-30 m-auto"/>
                    <h4 className = "text-center">Laboratory Information System Login</h4>

                    <form onSubmit={onSubmit}>
                    {msg && <div className='alert alert-danger text-center p-1 mb-1'>{msg}</div>}
                        <label htmlFor="username" >Username:</label><br />
                        <input 
                            type="text" 
                            id="form-field"
                            name="username"
                            className='form-control mb-0'
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <label htmlFor="password">Password:</label><br />
                        <input 
                            type="password" 
                            id="form-field"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <br />
                        
                        <input onClick={onSubmit} className="btn btn-success col-sm-12" type="submit" value="Login" />
                    </form>
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserLogin
