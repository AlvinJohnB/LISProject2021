import React from 'react'
import axios from 'axios';

function ChemTr({resultFormData, setPrevResultData, details, setShow, setResultFormData, setSectionResultArray}) {

    const selectHandler = async () => {

        await axios.get(`http://localhost:3001/order/resultform/${details.labNumber}`).then((response) => {
        setResultFormData(response.data);
        setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
        setShow(true);
        
        axios.get(`http://localhost:3001/order/result/previous/${response.data[0].Patientlists[0].id}/Chemistry`).then((response) => {
            setPrevResultData(response.data)
            console.log(response.data.Orders.length)
        })
        })
        
    }

    return (
        <tr className="lab tbcontent">
                <td>{details.labNumber}</td>
                <td>{details.Patientlists[0].lastname}, {details.Patientlists[0].firstname} {details.Patientlists[0].middlename}</td>
                <td>{details.Sectionorders[0].tests}</td>
                <td onClick={selectHandler}>Select</td>
        </tr>
    )
}

export default ChemTr
