import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

function Header() {
    const {authState} = useContext(AuthContext);

    return (
        <header>
        <div>logo</div>
        <p>Welcome, {authState}. Log-out?</p>
      </header>
    )
}

export default Header
