import React from 'react'

import './users.css'

function UserLogin() {




    return (
        <div className="login-form-wrapper">
            <div className="form-wrapper">
                <div className="login-form">
                    <h1>Logo</h1>
                    <h3>Login</h3>
                    <form>
                        <label >Username:</label><br />
                        <input 
                            type="text" 
                            id="form-field"
                            placeholder="Username"
                        />
                        <br />
                        <label>Password:</label><br />
                        <input 
                            type="password" 
                            id="form-field"
                            placeholder="Password"
                        />
                        <br />
                        <input className="login-form-botton" type="button" value="Login" />
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default UserLogin
