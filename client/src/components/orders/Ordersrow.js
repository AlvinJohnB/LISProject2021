import React from 'react'
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

import ProgressBar from 'react-bootstrap/ProgressBar'


function Ordersrow(props) {

    let history = useHistory();

    const onSelect = () => {
        history.push(`/order/${props.order.labNumber}`)
    }

    return (
        <tr className='patient-table'>
            <td className="text-center">{props.order.labNumber}</td>
            <td className="text-center">{props.order.Patientlists[0].lastname}, {props.order.Patientlists[0].firstname} {props.order.Patientlists[0].middlename}</td>
            <td>{props.order.testsRequested}</td>
            <td className="col-md-3 text-center align-center">{props.order.progress === 100 ? <ProgressBar striped variant="success" max={100} now={100} label={`100%`} /> : <ProgressBar animated max={100} now={props.order.progress} label={`${props.order.progress}%`} /> }</td>
            <td className="text-center">{Moment(props.order.createdAt).format('MMMM DD, yyyy')}</td>
            <td className="text-center" onClick={onSelect}>Select</td>
        </tr>
    )
}

export default Ordersrow
