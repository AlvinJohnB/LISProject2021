import React from 'react'

import "./ptreg.css"

function Duplicaterecord() {
    return (
        <div className="ptregwrapper">
            <h1>Patient Registration</h1>
            <hr />
            <p className="error">Duplicate record detected!<br />
            Try again.</p>
        </div>
    )
}

export default Duplicaterecord
