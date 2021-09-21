import React from 'react'
import {Link} from 'react-router-dom';

function LabNav() {
    return (
        <nav className="lab">
        <li>
            <ul><Link to="/">Reception</Link></ul>
            <ul><Link to="/laboratory">Specimen Check-in</Link></ul>
            <ul><Link to="/laboratory/chemistry">Chemistry</Link></ul>
            <ul><Link to="/laboratory">Hematology</Link></ul>
            <ul>Clinical Microscopy</ul>
            <ul>Serology</ul>
        </li>
      </nav>
    )
}

export default LabNav
