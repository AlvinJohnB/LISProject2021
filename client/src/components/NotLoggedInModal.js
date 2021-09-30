import React from 'react'
import '../components/laboratory/checkin/checkinmodal.css'
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
 
function NotLoggedInModal() {
    const { authState } = useContext(AuthContext);

    let history = useHistory();
    
    if(authState.status === true){
        return null

    }else{
        return (
            <div className="checkin-modal">
                <div className="login-modal-wrapper">
                    <div className="login-modal-header">
                        <div><strong>&nbsp;</strong></div>
                    </div>
                        <div className="checkin-modal-body">
                           <strong>You are not logged-in!</strong><br />
                           <p className="tablefooter">Please press the button to go to log-in window.</p>
                        </div>
                    <div className="checkin-modal-footer">
                            <input type="button" className="checkin-btn reject" value="Log-in" onClick={()=>{history.push('/login')}} />
                    </div>
                </div>
            </div>
        )

    }
}

export default NotLoggedInModal
