import React from 'react'
import {Link} from 'react-router-dom';

function LabNav() {
    return (
        <nav className="lab">
        <li>
            <ul><Link to="/">Reception</Link></ul>
            <ul><Link to="/laboratory">Specimen Check-in</Link></ul>
            <ul><Link to="/laboratory/chemistry">Chemistry</Link></ul>
            <ul><Link to="/laboratory/hematology">Hematology</Link></ul>
            <ul><Link to="/laboratory/cm">Clinical Microscopy</Link></ul>
            <ul><Link to="/laboratory/sero">Serology</Link></ul>
        </li>
      </nav>
    )
}

export default LabNav
