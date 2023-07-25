import React from 'react'
import '../components/laboratory/checkin/checkinmodal.css'
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

import Modal from 'react-bootstrap/Modal';
 
function NotLoggedInModal() {
    const { authState } = useContext(AuthContext);

    let history = useHistory();
    
    if(authState.status === true){
        return null

    }else{
        return (
            <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header className="bg-success">
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center">
              <strong>You are not logged in!</strong>
              <p>Press the button to redirect to the log-in page.</p>
              <input type="button" className="btn btn-success" value="Log-in" onClick={()=>{history.push('/login')}} />
            </Modal.Body>
            <Modal.Footer>
     
            </Modal.Footer>
          </Modal>
        )

    }
}

export default NotLoggedInModal
