import React from 'react';
import { Link } from 'react-router-dom';

import "./ptreg.css"

function Duplicaterecord() {
    return (

        <div className="ptregwrapper">

            <h1>Patient Registration</h1>
            <hr />
            <h4>Error:</h4>
            <p className="error">Duplicate record detected!</p>
            <Link to="/ptsearch"><p className="link">Click here to redirect to Patient Search</p></Link>
            


        </div>
    )
}

export default Duplicaterecord
