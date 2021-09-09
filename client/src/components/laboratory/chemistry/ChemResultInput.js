import React from 'react'
import './chemresult.css'
import { useState, useEffect } from 'react'


function ChemResultInput ({show, closeModal, resultFormData, sectionResultArray} ) {

    const[running, setRunning] = useState(true);

    if(!show){
        return null
    }

    return (
        <div className="checkin-modal">
            <div className="checkin-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Enter Result:</strong></div>
                    <div className="checkin-closebtn" onClick={closeModal}>X</div>
                </div>
                    <div className="checkin-modal-body">
                        {/* <p className="order-dits">
                            <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                            <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                            <br />
                        </p> */}
                    </div>
                <div className="checkin-modal-footer">
                </div>
            </div>
        </div>
    )
}

export default ChemResultInput
