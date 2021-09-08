import React from 'react'

function chemTr({details, setShow}) {

    const selectHandler = () => {
        setShow(true);
        console.log(details.Sectionorders[0].sectNumber);
    }
    return (
        <tr className="tbcontent">
                <td>{details.labNumber}</td>
                <td>{details.Patientlists[0].lastname}, {details.Patientlists[0].firstname} {details.Patientlists[0].middlename}</td>
                <td>{details.Sectionorders[0].tests}</td>
                <td onClick={selectHandler}>Select</td>
        </tr>
    )
}

export default chemTr
