import React from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import ResultForm from '../results/ResultForm'
import ResultFormA4 from '../results/ResultFormA4'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../laboratory/checkin/checkinmodal.css'

function Selectsize(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState([])

    useEffect(()=> {
            axios.get(`http://localhost:3001/order/results/${props.forOrderID}/${props.section}`).then((response) => {
            setResultData(response.data)
            setIsLoading(false)
        })
    }, [props.forOrderID, props.sectionserve])


    if(props.show === false){
        return null

    }else{
        if(isLoading === true){
            return(<div>Loading</div>)
        }else{
            return (
                <div className="checkin-modal">
                    <div className="login-modal-wrapper">
                        <div className="loading-modal-header">
                            <div><strong>&nbsp;</strong></div>
                            <div className="checkin-closebtn" onClick={()=>{props.setShow(false)}}>X</div>
                        </div>
                            <div className="checkin-modal-body">
                               <strong>Please select paper size</strong><br />
                               <PDFDownloadLink
                                document={<ResultForm data={resultData[0]} />}
                                fileName={`${props.detail.sectNumber}`}
                                className="size-btn"
                                >
                                  {({ blob, url, loading, error }) =>
                                    loading ? 'Loading...' : 'Half bond'
                                }
                                </PDFDownloadLink>
    
                                <PDFDownloadLink
                                document={<ResultFormA4 data={resultData[0]}/>}
                                fileName={`${props.detail.sectNumber}`}
                                className="size-btn"
                                data={resultData[0]}
                                >
                                   {({ blob, url, loading, error }) =>
                                    loading ? 'Loading...' : 'Letter'
                                }
                                </PDFDownloadLink>
                            </div>
                        <div className="checkin-modal-footer">
                            
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default Selectsize
