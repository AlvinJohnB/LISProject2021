import React from 'react'
import './chemresult.css'
import axios from 'axios';


function ChemResultmodal ({show, closeModal} ) {


    if(!show){
        return null
    }

    return (
        <div className="checkin-modal">
            <div className="checkin-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Result Entry Module:</strong></div>
                    <div className="checkin-closebtn" onClick={closeModal}>X</div>
                </div>
                    <div className="checkin-modal-body">
                        {/* <p className="order-dits">
                            <strong>Patient Name:</strong> {props.selected[0].Patientlists[0].lastname}, {props.selected[0].Patientlists[0].firstname} {props.selected[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {props.selected[0].Sectionorders[0].section}<br />
                            <strong>Lab Number:</strong> {props.selected[0].Sectionorders[0].sectNumber}<br />
                            <strong>Test/s:</strong> {props.selected[0].Sectionorders[0].tests}
                        </p> */}
                    </div>
                <div className="checkin-modal-footer">
                        {/* <input type="button" className="checkin-btn accept" value="Accept" onClick={onAccept}/>
                        <input type="button" className="checkin-btn reject" value="Reject"/> */}
                </div>
            </div>
        </div>
    )
}

export default ChemResultmodal
