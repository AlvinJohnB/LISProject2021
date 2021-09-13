import React from 'react'
import axios from 'axios';

import Header from '../../Header';
import LabNav from '../LabNav';
import ChemTr from './ChemTr';
import ChemResultmodal from './ChemResultmodal';


import { useState, useEffect } from 'react'

function ChemForm() {

    const [sectionData, setSectionData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [resultFormData, setResultFormData] = useState();
    const [sectionResultArray, setSectionResultArray] = useState();
    const [prevResultData, setPrevResultData] = useState();

    const closeModal = () => {
        setShow(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/order/section/Chemistry`).then((response) => {
            setSectionData(response.data);
            setIsLoading(false);
        })
    },[sectionResultArray])

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
                <h1 className="labcontentheader">&nbsp; Clinical Chemistry</h1>
                
                <div className="labdiv">
                    <div className="labdivcontent">
                        <div className="labdiv-flex-block">

                            <div className="mr-10">
                                <label>Filter:</label><br />
                                <input type="text" placeholder="Enter lab no..." />
                            </div>

                            <div className="mr-10">
                                <input className="btn filter" type="button" value="Filter" />
                            </div>
                            
                        </div>

                        <br />
                        <table className="tablelab">
                            <tbody>
                                <tr className="labheader">
                                    <th>LabNumber</th>
                                    <th>Client Name</th>
                                    <th>Test/s</th>
                                    <th>Action</th>
                                </tr>
                                {sectionData.map((details) => {
                                return(
                                    <ChemTr 
                                        details={details} 
                                        key={details.id}
                                        setShow={setShow}
                                        setResultFormData={setResultFormData}
                                        setSectionResultArray={setSectionResultArray}
                                        setPrevResultData={setPrevResultData}
                                    />
                                )
                            })}

                            </tbody>
                        </table>

                    </div>

                    <ChemResultmodal
                        show={show}
                        closeModal={closeModal}
                        resultFormData={resultFormData}
                        sectionResultArray={sectionResultArray}
                        setSectionResultArray={setSectionResultArray}
                        setResultFormData={setResultFormData}
                        prevResultData={prevResultData}
                        setPrevResultData={setPrevResultData}
                    />
                    
                </div>
            </div>
              
         </div>
         </section>
          <footer>Laboratory Information System by Bregs</footer>
    </div>
    )
}

export default ChemForm
