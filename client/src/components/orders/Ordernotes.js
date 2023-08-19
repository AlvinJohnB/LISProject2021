import React from 'react'
import { useState } from 'react'
import Moment from 'moment'
import LoadingModal from '../LoadingModal'

function Ordernotes({note, setNoteIDForDelete, setDeleteNotesModal}) {


    const [isLoading] = useState(false)
        if(isLoading){
        return(
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }
    return (
    <tr>
        <td>{Moment(note.createdAt).format('MMMM DD, yyyy hh:mm a')}</td>
        <td>{note.note}</td>
        <td>{note.inputBy} <p onClick={()=>{setNoteIDForDelete(note.id); setDeleteNotesModal(true)}} className='noteDelete'>delete</p></td>
    </tr>
    // <tr>
    //     <td>{note.note} noted on {Moment(note.createdAt).format('MMMM DD, yyyy hh:mm a')}  by {note.inputBy} <p className='noteDelete' onClick={()=>{setNoteIDForDelete(note.id); setDeleteNotesModal(true)}}>delete</p></td>
        
    // </tr>
    )
}

export default Ordernotes
