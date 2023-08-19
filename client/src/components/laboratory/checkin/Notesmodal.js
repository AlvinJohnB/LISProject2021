import React, { useEffect } from 'react'
import './checkinmodal.css' 
import '../../orders/orderdetails.css'
import {useState} from 'react'
import axios from 'axios'
import host from '../../../config.json'
import Modal from 'react-bootstrap/Modal'
import NoteTR from './NoteTR'
import Deletenotes from '../../orders/Deletenotes'
import AddnotesModal from '../../orders/AddnotesModal'

function Notesmodal(props) {

    const [orderNotes, setOrderNotes] = useState()
    const [noteIDforDelete, setNoteIDforDelete] = useState()
    const [deleteNoteShow, setDeleteNoteShow] = useState(false)

    const [remark, setRemark] = useState()
    const [addNotesModal, setAddNotesModal] = useState()
    

    useEffect(()=>{

        axios.get(`http://${host.ip}:3001/order/remarks-fetch/${props.orderID}`).then((response) => 
        {
            setOrderNotes(response.data)
        })

    },[props.show, addNotesModal])

  
    if(props.show === false){
        return null

    }else{
            return (
               <Modal
                show={props.show}
                onHide={()=>{props.setShow(false)}}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
                >
                <Modal.Header className="bg-primary" closeButton>
                <Modal.Title className='text-white'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="d-flex flex-column" >
                                <strong>Notes/Remarks:</strong><br />
                                {orderNotes.length === 0 ? <div class="alert alert-danger" role="alert">No notes to show, click "Add Note" to add note or remark.</div>: 
                                    <table className='table table-sm'>
                                        <tbody>
                                            <tr className='table-secondary'>
                                                <th>Date</th>
                                                <th className='col-sm-6'>Details</th>
                                                <th>Username</th>
                                            </tr>

                                            {/* Logic Here */}
                                            {orderNotes.map((note, index) => {
                                                return(
                                                    <NoteTR setNoteIDforDelete={setNoteIDforDelete} setDeleteNoteShow={setDeleteNoteShow} note={note} key={index} />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                
                                
                                {/* <textarea onBlur={getRemark} placeholder='Type remarks/notes here..'></textarea> */}
                                <button onClick={()=>{setAddNotesModal(true)}}  className="btn btn-primary"> Add Note </button>
                            </div>
                        </div>
                        <Deletenotes 
                            noteIDforDelete={noteIDforDelete}
                            setShow={setDeleteNoteShow}
                            show={deleteNoteShow}
                            orderID={props.orderID}
                            orderNotes={orderNotes}
                            setOrderNotes={setOrderNotes} 
                        />

                        <AddnotesModal
                            setOrderNotes={setOrderNotes}
                            orderID={props.orderID}
                            show={addNotesModal}
                            setShow={setAddNotesModal}
                        />
                    
                    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }

export default Notesmodal;
