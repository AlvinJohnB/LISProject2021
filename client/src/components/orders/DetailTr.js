import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResultForm from '../results/ResultForm'

function DetailTr({detail}) {

    const onGenerate = async () => {

    }
    return (
        <tr>
            <td>{detail.sectNumber}</td>
            <td>{detail.status}</td>
            <td>
                {detail.status === "RELEASED" && <button className="checkin-btn accept" onClick={onGenerate}>Generate Report</button>}
                {detail.status === "RELEASED" && <PDFDownloadLink
                                                        document={<ResultForm />}
                                                        fileName="movielist.pdf"
                                                        style={{
                                                            textDecoration: "none",
                                                            padding: "10px",
                                                            color: "#4a4a4a",
                                                            backgroundColor: "#f2f2f2",
                                                            border: "1px solid #4a4a4a"
                                                        }}
                                                        >
                                                        </PDFDownloadLink>}
                {detail.status !== "RELEASED"  && <button className="checkin-btn-disabled" disabled={true} onClick={onGenerate}>Generate Report</button>}
            </td>
        </tr>
    )
}

export default DetailTr
