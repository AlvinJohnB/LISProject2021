import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResultForm from '../results/ResultForm'
import ResultFormA4 from '../results/ResultFormA4'
import '../laboratory/checkin/checkinmodal.css'

function Selectsize({show, setShow, detail}) {
    if(show === false){
        return null

    }else{
        return (
            <div className="checkin-modal">
                <div className="login-modal-wrapper">
                    <div className="loading-modal-header">
                        <div><strong>&nbsp;</strong></div>
                        <div className="checkin-closebtn" onClick={()=>{setShow(false)}}>X</div>
                    </div>
                        <div className="checkin-modal-body">
                           <strong>Please select paper size</strong><br />
                           <PDFDownloadLink
                            document={<ResultForm />}
                            fileName={`${detail.sectNumber}.pdf`}
                            className="size-btn"
                            >
                            A5
                            </PDFDownloadLink>

                            <PDFDownloadLink
                            document={<ResultFormA4 />}
                            fileName={`${detail.sectNumber}_A4.pdf`}
                            className="size-btn"
                            >
                            A4
                            </PDFDownloadLink>
                        </div>
                    <div className="checkin-modal-footer">
                        
                    </div>
                </div>
            </div>
        )

    }
}

export default Selectsize
