import React from 'react'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'

import Modal from 'react-bootstrap/Modal'

function PrintPrevResult(props) {



    if(props.show === false){
        return null

    }else{
            return (
               <Modal
                show={props.show}
                onHide={()=>{props.setShow(false)}}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header className="bg-success" closeButton>
                <Modal.Title>Previous transaction found</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center align-text-center">
                        <strong>Do you want to include the most recent previous result on the result form?</strong><br />
                        <button onClick={()=>{props.setIncludePrev(true); props.setShow(false);}}  className="btn btn-success col-md-4"> Yes </button>
                        <button onClick={()=>{props.setIncludePrev(false); props.setShow(false);}}  className="btn btn-danger col-md-4"> No </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }

export default PrintPrevResult
