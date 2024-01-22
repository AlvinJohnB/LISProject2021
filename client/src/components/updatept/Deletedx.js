import React from 'react'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'
import Modal from 'react-bootstrap/Modal'

function Deletedx (props) {



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
                <Modal.Header className="bg-danger" closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <strong>Confirm deletion of note/remark. Deleted remarks cannot be undone.</strong><br />
                        <button onClick={()=>{props.deleteDx(props.dxDeleteID); props.setShow(false);}}  className="btn btn-danger col-md-4"> Confirm delete </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }

export default Deletedx;
