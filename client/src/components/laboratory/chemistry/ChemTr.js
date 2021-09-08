import React from 'react'
import axios from 'axios';

function chemTr({details, setShow, setResultFormData, setSectionResultArray}) {

    const selectHandler = async () => {

        await axios.get(`http://localhost:3001/order/resultform/${details.labNumber}`).then((response) => {
            setResultFormData(response.data);
            setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
            setShow(true);
            console.log(response.data[0].Sectionorders[0].Sectionresults)
        })
        
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
