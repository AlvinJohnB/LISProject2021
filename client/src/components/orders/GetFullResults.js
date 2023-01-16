import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../laboratory/checkin/checkinmodal.css' 
import '../orders/orderdetails.css'
import FullResults from '../results/FullResults'
import FullResultsHalf from '../results/FullResultsHalf'
import host from '../../config.json'

import Modal from 'react-bootstrap/Modal'

function GetFullResults(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState([])

    useEffect(async ()=> {
            await axios.get(`http://${host.ip}:3001/order/fullresults/${props.forOrderID}`).then((response) => {
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
               <Modal
                show={props.show}
                onHide={()=>{props.setShow(false)}}
                backdrop="static"
                keyboard={false}
                centered
                >
                <Modal.Header className="bg-success" closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center">
                        <strong>Please select paper size</strong><br />
                        <PDFDownloadLink
                            document={<FullResultsHalf data={resultData[0]} />}
                            fileName={`Full Results ${props.forOrderID}`}
                            className="btn btn-success col-md-5"
                            >
                                {({ blob, url, loading, error }) =>
                                loading ? 'Loading...' : 'Half bond'
                            }
                            </PDFDownloadLink>

                            <PDFDownloadLink
                            document={<FullResults data={resultData[0]}/>}
                            fileName={`Full Results ${props.forOrderID}`}
                            className="btn btn-success col-md-5"
                            data={resultData[0]}
                            >
                                {({ blob, url, loading, error }) =>
                                loading ? 'Loading...' : 'Letter'
                            }
                            </PDFDownloadLink>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            )
        }

    }
}

export default GetFullResults
