import React from 'react'
import './chemresult.css'
import { useState, useEffect } from 'react'

import ChemResultInput from './ChemResultInput'
import ChemTest from './ChemTest'
function ChemResultmodal ({show, closeModal, resultFormData, sectionResultArray} ) {

    const[running, setRunning] = useState(true);

    if(!show){
        return null
    }

    return (
        <div className="checkin-modal">
            <div className="checkin-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Result Entry for Lab Number: {resultFormData[0].labNumber}</strong></div>
                    <div className="checkin-closebtn" onClick={closeModal}>X</div>
                </div>
                    <div className="checkin-modal-body">
                        <p className="order-dits">
                            <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                            <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                            <br />

                            <table className="tablelab">
                                <tbody>
                                    <tr className="labheader">
                                        <th>Test</th>
                                        <th>Result</th>
                                        <th>Unit</th>
                                        <th>Reference</th>
                                    </tr>
                                    
                                    {sectionResultArray.map((test) => {
                                    return(
                                    <ChemTest test={test} />
                                    )
                                })}

                                </tbody>
                            </table>
                        </p>
                        {running ?
                        <input type="button" className="checkin-btn accept" value="Release"/>:
                        <input type="button" className="checkin-btn reject" value="Undo Release"/>}
                    </div>
                <div className="checkin-modal-footer">
                </div>
                    <ChemResultInput />
            </div>
        </div>
    )
}

export default ChemResultmodal
