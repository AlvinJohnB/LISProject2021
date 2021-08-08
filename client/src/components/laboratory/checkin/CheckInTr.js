import React from 'react'

function checkInTr({details}) {
    const selectHandler = () => {
        console.log(details.Sectionorders[0].sectNumber)
    }
    return (
        <tr>
                <td>{details.labNumber}</td>
                <td>{details.Patientlists[0].lastname}, {details.Patientlists[0].firstname} {details.Patientlists[0].middlename}</td>
                <td>{details.Sectionorders[0].tests}</td>
                <td onClick={selectHandler}>Select</td>
        </tr>
    )
}

export default checkInTr
