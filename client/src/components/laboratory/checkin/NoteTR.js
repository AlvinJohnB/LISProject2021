import React from 'react'
import { useState } from 'react'
import Moment from 'moment'
import LoadingModal from '../../LoadingModal'

function NoteTR({note, setDeleteNoteShow, setNoteIDforDelete}) {


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
        <td>{note.inputBy} <p onClick={()=>{setDeleteNoteShow(true); setNoteIDforDelete(note.id)}} className='noteDelete'>delete</p></td>
    </tr>
    )
}

export default NoteTR
