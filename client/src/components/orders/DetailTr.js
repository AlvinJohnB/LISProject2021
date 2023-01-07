import React from 'react'
import { useState } from 'react'

import LoadingModal from '../LoadingModal'
import Selectsize from './Selectsize'

function DetailTr({detail}) {

    const [isLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const onGenerate = () => {
        setModalShow(true)
    }

    if(isLoading){
        return(
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }
    return (
        <tr>
            <td>{detail.sectNumber}</td>
            <td>{detail.status}</td>
            <td>
                  <Selectsize show={modalShow} setShow={setModalShow} detail={detail} forOrderID={detail.forOrderID} section={detail.section}/>
                {detail.status === "RELEASED" && <button className="btn btn-success" onClick={onGenerate}>Generate Report</button>}
    
                {detail.status !== "RELEASED"  && <button className="btn btn-danger" disabled={true} onClick={onGenerate}>Generate Report</button>}
            </td>
        </tr>
    )
}

export default DetailTr
