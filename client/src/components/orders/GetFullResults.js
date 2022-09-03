import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../laboratory/checkin/checkinmodal.css'
import FullResults from '../results/FullResults'

function GetFullResults(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState([])

    useEffect(()=> {
            axios.get(`http://localhost:3001/order/fullresults/${props.forOrderID}`).then((response) => {
            setResultData(response.data)
            setIsLoading(false)
        })
    }, [props.forOrderID])


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
                                
                               {/* <PDFDownloadLink
                                document={<ResultForm data={resultData[0]} />}
                                fileName={`${props.detail.sectNumber}`}
                                className="size-btn"
                                >
                                  {({ blob, url, loading, error }) =>
                                    loading ? 'Loading...' : 'A5 (half)'
                                }
                                </PDFDownloadLink> */}
    
                                <PDFDownloadLink
                                document={<FullResults data={resultData[0]}/>}
                                fileName={`Full Results ${props.forOrderID}`}
                                className="size-btn"
                                data={resultData[0]}
                                >
                                   {({ blob, url, loading, error }) =>
                                    loading ? 'Loading...' : 'A4 (whole)'
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

export default GetFullResults
