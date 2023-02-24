import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResultForm from '../results/ResultForm'
import ResultFormA4 from '../results/ResultFormA4'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../laboratory/checkin/checkinmodal.css'
import host from '../../config.json'

import Modal from 'react-bootstrap/Modal'
import LoadingModal from '../LoadingModal'

function Selectsize(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState([]);


    useEffect(async ()=> {
            await axios.get(`http://${host.ip}:3001/order/results/${props.forOrderID}/${props.section}`).then((response) => {
            setResultData(response.data)
            setIsLoading(false)
        })
    }, [props.forOrderID, props.sectionserve])

    if(props.show === false){
        return null

    }else{
        if(isLoading === true){
            return(<div><LoadingModal /></div>)
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
                        document={<ResultForm data={resultData[0]} includePrev={props.includePrev} prevResDetails={props.prevResDetails} PrevResData={props.PrevResData} />}
                        fileName={`${props.detail.sectNumber}`}
                        className="btn btn-success col-md-5"
                        >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading...' : 'Half bond'
                        }
                        </PDFDownloadLink>

                        <PDFDownloadLink
                        document={<ResultFormA4 data={resultData[0]} includePrev={props.includePrev} prevResDetails={props.prevResDetails} PrevResData={props.PrevResData}/>}
                        fileName={`${props.detail.sectNumber}`}
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

export default Selectsize
