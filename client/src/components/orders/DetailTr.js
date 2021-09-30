import React from 'react'
import axios from 'axios'
import { useState } from 'react'

import LoadingModal from '../LoadingModal'
import Selectsize from './Selectsize'

function DetailTr({detail}) {

    const [isLoading, setIsLoading] = useState(false)
    const [resultData, setResultData] = useState([])
    const [modalShow, setModalShow] = useState(false)

    const onGenerate = async () => {
        setIsLoading(true)
        console.log(detail)
        await axios.get(`http://localhost:3001/order/results/${detail.forOrderID}/${detail.section}`).then((response) => {
            setResultData(response.data)
            setIsLoading(false)
            console.log(response.data)
            //setModalShow(true)
        })
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
                  <Selectsize show={modalShow} setShow={setModalShow} data={resultData} detail={detail} />
                {detail.status === "RELEASED" && <button className="checkin-btn accept" onClick={onGenerate}>Generate Report</button>}
          
                {detail.status !== "RELEASED"  && <button className="checkin-btn-disabled" disabled={true} onClick={onGenerate}>Generate Report</button>}
            </td>
        </tr>
    )
}

export default DetailTr
