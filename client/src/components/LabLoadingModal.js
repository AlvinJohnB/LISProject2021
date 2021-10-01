import React from 'react'
import '../components/laboratory/checkin/checkinmodal.css'
import loading from '../images/loading.gif'

function LabLoadingModal() {

    return (
        <div className="loading-modal">
            <div className="login-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>&nbsp;</strong></div>
                </div>
                    <div className="loading-modal-body">
                        <img src={loading} alt="loading" width="auto"  style={{marginRight: "10px"}}/>
                       <strong>Loading please wait...</strong><br />
                    </div>
                <div className="checkin-modal-footer">
                </div>
            </div>
        </div>
    )

}

export default LabLoadingModal
