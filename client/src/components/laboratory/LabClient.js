import React from 'react'
import {Link} from 'react-router-dom';



import Header from '../Header';


function LabClient() {
    return (
        <div className="wrapper">
            <Header />

            <nav className="lab">
                <li>
                    <ul><Link to="/laboratory">Specimen Check-in</Link></ul>
                    <ul><Link to="/laboratory">Chemistry</Link></ul>
                    <ul><Link to="/laboratory">Hematology</Link></ul>
                    <ul>Clinical Microscopy</ul>
                    <ul>Serology</ul>
                </li>
              </nav>
              <section>
              </section>
              <footer>Laboratory Information System by Bregs</footer>
        </div>
    )
}

export default LabClient
