import React from 'react'
import { useState } from 'react'

import LoadingModal from '../LoadingModal'
import Selectsize from './Selectsize'

function DetailTr({hasPrev, detail, includePrev, setPrevModalShow, prevResDetails, PrevResData}) {

    const [isLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const onGenerate = () => {
        setModalShow(true)
    }

    const ModalPrevShow = () => {
        if(hasPrev === true){
            setPrevModalShow(true)
        }else{
            setModalShow(true)
        }
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
                  <Selectsize PrevResData={PrevResData} includePrev={includePrev} prevResDetails={prevResDetails}  show={modalShow} patho={detail.pathologist} setShow={setModalShow} detail={detail} forOrderID={detail.forOrderID} section={detail.section}/>
                {detail.status === "RELEASED" && <button className="btn btn-success" onClick={() => {ModalPrevShow(); onGenerate(); }}>Generate Report</button>}
    
                {detail.status !== "RELEASED"  && <button className="btn btn-danger" disabled={true} onClick={onGenerate}>Generate Report</button>}
            </td>
        </tr>
    )
}

export default DetailTr
