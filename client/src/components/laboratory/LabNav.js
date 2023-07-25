import React from 'react'
import {Link} from 'react-router-dom';

function LabNav() {
    return (
        <nav className="bg-primary bg-gradient d-flex p-1 position-sticky">
        <li className="d-flex align-items-center">
            <ul className="lab"><Link to="/">Reception</Link></ul>
            <ul className="lab"><Link to="/laboratory">Specimen Check-in</Link></ul>
            <ul className="lab"><Link to="/laboratory/chemistry">Chemistry</Link></ul>
            <ul className="lab"><Link to="/laboratory/hematology">Hematology</Link></ul>
            <ul className="lab"><Link to="/laboratory/cm">Clinical Microscopy</Link></ul>
            <ul className="lab"><Link to="/laboratory/sero">Serology</Link></ul>
        </li>
      </nav>
    )
}

export default LabNav
