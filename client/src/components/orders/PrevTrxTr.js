import React from 'react'
import Moment from 'moment'
import { useHistory } from 'react-router-dom';


function PrevTrxTr({detail}) {

    let history = useHistory();

    const onSelect = (e) => {
        const labNo = e.target.id
        history.push(`/order/${labNo}`)
    }

    return (
        <tr className="tbcontent">
            <td onClick={onSelect} id={detail.labNumber}>{detail.labNumber}</td>
            <td onClick={onSelect} id={detail.labNumber}>{Moment(detail.createdAt).format('MMMM DD, yyyy')}</td>
            <td onClick={onSelect} id={detail.labNumber}>{detail.testsRequested}</td>
        </tr>
    )
}

export default PrevTrxTr
