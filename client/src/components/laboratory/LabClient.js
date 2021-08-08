import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'


import './lab.css'
import Header from '../Header';
import LabNav from './LabNav';
import CheckInTr from './checkin/CheckInTr';

function LabClient() {

    const [isLoading, setIsLoading] = useState(true);
    const [checkInDetails, setCheckInDetails] = useState([]);
    const [section, setSection] = useState();

    useEffect(() => {

        axios.get(`http://localhost:3001/order/forcheckin/Chemistry`).then((response) => {
            setCheckInDetails(response.data);
            setSection("Chemistry");
            setIsLoading(false);
        })

    }, [])


    const sectionHandler = (e) => {
        const section = e.target.value;

        if(section === "CM"){
            setSection("Clinical Microscopy")
        }else{
            setSection(section);
        }

        axios.get(`http://localhost:3001/order/forcheckin/${section}`).then((response) => {
            setCheckInDetails(response.data);
            console.log(response.data);
        })
    }

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="wrapper">
            <Header />
            <LabNav />
              <section>
              <div className="ptregwrapper">

                <div className="labwrapper">

                        <h1 className="labcontentheader">Specimen Check-in</h1>

                        
                        <div className="labdiv">
                            <div className="labdivcontent">
                                <div className="labdiv-flex-block">
                                    <div className="mr-10">
                                        <label>Section:</label><br />
                                        <select onChange={sectionHandler}>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Hematology">Hematology</option>
                                            <option value="CM">Clinical Microscopy</option>
                                            <option value="Serology">Serology</option>
                                        </select>
                                    </div>

                                    <div className="mr-10">
                                        <label>Filter:</label><br />
                                        <input type="text" placeholder="Enter lab no..." />
                                    </div>

                                    <div className="mr-10">
                                        <input className="btn filter" type="button" value="Filter" />
                                    </div>
                                </div>
                                
                                 <h3 className="mt-10">{section}</h3>
                                <table className="tablelab">
                                    <tbody>
                                        <tr className="labheader">
                                            <td>LabNumber</td>
                                            <td>Client Name</td>
                                            <td>Test/s</td>
                                            <td>Action</td>
                                        </tr>
                                        {checkInDetails.map((details) => {
                                        return(
                                            <CheckInTr details={details} key={details.id} />
                                        )
                                    })}

                                    </tbody>
                                </table>


                            </div>
                        </div>
                        
                </div>
             </div>
             </section>
              <footer>Laboratory Information System by Bregs</footer>
        </div>
    )
}

export default LabClient
