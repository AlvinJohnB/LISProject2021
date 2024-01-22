import React from 'react'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'
import {useState} from 'react'
import axios from 'axios'
import host from '../../config.json'
import Modal from 'react-bootstrap/Modal'

function Adddx(props) {

    const [note, setNote] = useState()


    const addNote = (e) => {
        const msg = e.target.value
        setNote(msg)
    }

    const submitDx = async () => {
            await axios.post(`http://${host.ip}:3001/patient/dx-add`,{
                ptID: props.ptID,
                diagnosis: note
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
                <Modal.Header className={props.isLab === false ? `bg-success` : `bg-primary`} closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column">
                        <strong>Enter diagnosis or clinical information</strong><br />
                        <textarea onBlur={addNote}></textarea>
                        <button onClick={()=>{submitDx();}} className={props.isLab === false ? `btn btn-success col-md-4` : `btn btn-primary col-md-4`}> Submit </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }

export default Adddx;
