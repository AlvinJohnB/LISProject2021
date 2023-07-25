import React from 'react'
import { useHistory } from 'react-router-dom';
import Moment from 'moment';


function Ordersrow(props) {

    let history = useHistory();

    const onSelect = () => {
        history.push(`/order/${props.order.labNumber}`)

    }
    return (
        <tr className='patient-table'>
            <td>{props.order.labNumber}</td>
            <td>{props.order.Patientlists[0].lastname}, {props.order.Patientlists[0].firstname} {props.order.Patientlists[0].middlename}</td>
            <td>{props.order.testsRequested}</td>
            <td>{Moment(props.order.createdAt).format('MMMM DD, yyyy')}</td>
            <td onClick={onSelect}>Select</td>
        </tr>
    )
}

export default Ordersrow
