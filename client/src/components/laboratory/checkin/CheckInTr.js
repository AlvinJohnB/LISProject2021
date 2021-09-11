import React from 'react'

function checkInTr({details, setShow, setOrderID}) {

    const selectHandler = () => {
        setShow(true);
        setOrderID(details.Sectionorders[0].forOrderID);
    }
    return (
        <tr className="tbcontent lab rform">
                <td>{details.labNumber}</td>
                <td>{details.Patientlists[0].lastname}, {details.Patientlists[0].firstname} {details.Patientlists[0].middlename}</td>
                <td>{details.Sectionorders[0].tests}</td>
                <td onClick={selectHandler}>Select</td>
        </tr>
    )
}

export default checkInTr
