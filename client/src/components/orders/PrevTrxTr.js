import React from 'react'
import Moment from 'moment'


function PrevTrxTr({detail}) {
    return (
        <tr>
            <td>{detail.labNumber}</td>
            <td>{Moment(detail.createdAt).format('MMMM DD, yyyy')}</td>
            <td>{detail.testsRequested}</td>
        </tr>
    )
}

export default PrevTrxTr
