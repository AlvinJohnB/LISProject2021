import React from 'react'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'
import {useState} from 'react'
import host from '../../config.json'
import Moment from 'moment'
function Diagnosis({setAddDxShow, dx, deleteDx,setDeleteDxShow, setDxDeleteID }) {



    return (
        <div>
            <strong>Clinical Information</strong> <p className='noteAdd' onClick={()=>{setAddDxShow(true)}}>click here to add</p>
            <table className='table table-sm'>
            <tbody>
            <tr className='table-secondary'>
                <th>Date entered</th>
                <th className='col-md-8'>Diagnosis/Clinical history</th>
                <th>By:</th>
            </tr>
            
            {dx.map((diag, index) => {
                return(
                    <tr key = {index}>
                        <td>{Moment(diag.createdAt).format('MMMM DD, yyyy hh:mm a')}</td>
                        <td>{diag.diagnosis} <p onClick={()=>{setDxDeleteID(diag.id); setDeleteDxShow(true)}} className='noteDelete'>delete</p></td>
                        <td>{diag.inputBy}</td>
                    </tr>
                )
            })}

            
            </tbody>
            </table>
            {dx.length <= 0 && <div class="alert alert-info align-items-center">No medical/clinical history to show.</div>}
            
        </div>
    )

    }

export default Diagnosis;
