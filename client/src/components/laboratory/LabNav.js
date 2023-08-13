import React from 'react'
import {Link} from 'react-router-dom';

function LabNav() {
    return (
        <nav className="bg-primary p-1 position-sticky">
        <ul className="d-flex align-items-center">
            <li className="lab"><Link to="/">Reception</Link></li>
            <li className="lab"><Link to="/laboratory">Specimen Check-in</Link></li>
            <li className="lab"><Link to="/laboratory/chemistry">Chemistry</Link></li>
            <li className="lab"><Link to="/laboratory/hematology">Hematology</Link></li>
            <li className="lab"><Link to="/laboratory/cm">Clinical Microscopy</Link></li>
            <li className="lab"><Link to="/laboratory/sero">Serology</Link></li>
        </ul>
      </nav>
    )
}

export default LabNav
