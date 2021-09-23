import React from 'react'

function DetailTr({detail}) {

    const onGenerate = async () => {
    }
    return (
        <tr>
            <td>{detail.sectNumber}</td>
            <td>{detail.status}</td>
            <td>
                {detail.status === "RELEASED" && <button className="checkin-btn accept" onClick={onGenerate}>Generate Report</button>}
                {detail.status === "RUNNING" && <button className="checkin-btn-disabled" disabled={true} onClick={onGenerate}>Generate Report</button>}
            </td>
        </tr>
    )
}

export default DetailTr
