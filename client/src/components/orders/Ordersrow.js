import React from 'react'

function Ordersrow(props) {

    const onSelect = () => {
        console.log(props.order)
    }
    return (
        <tr className="tbcontent">
            <td>{props.order.labNumber}</td>
            <td>{props.order.Patientlists[0].lastname}, {props.order.Patientlists[0].firstname} {props.order.Patientlists[0].middlename}</td>
            <td>{props.order.testsRequested}</td>
            <td>{props.order.status}</td>
            <td onClick={onSelect}>Select</td>
        </tr>
    )
}

export default Ordersrow
