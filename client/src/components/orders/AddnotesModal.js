import React from 'react'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'
import {useState} from 'react'
import axios from 'axios'
import host from '../../config.json'
import Modal from 'react-bootstrap/Modal'

function AddnotesModal(props) {

    const [note, setNote] = useState()


    const addNote = (e) => {
        const msg = e.target.value
        setNote(msg)
    }

    const submitNote = () => {
            axios.post(`http://${host.ip}:${host.port}/order/remarks-add`,{
                orderID: props.orderID,
                note: note
            },{
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res)=>{
                props.setShow(false);
            })
    }

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
                <Modal.Header className="bg-primary" closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column">
                        <strong>Enter note or remark</strong><br />
                        <textarea onBlur={addNote}></textarea>
                        <button onClick={()=>{submitNote();}}  className="btn btn-primary col-md-4"> Submit </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }

export default AddnotesModal;
