import React from 'react'
import axios from 'axios';
import host from '../../../config.json'

function ChemTr({ setPrevResultData, details, setShow, setResultFormData, setSectionResultArray}) {

    const selectHandler = async () => {

        await axios.get(`http://${host.ip}:3001/order/resultform/${details.labNumber}/${details.Sectionorders[0].section}`).then((response) => {
        setResultFormData(response.data);
        setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
        setShow(true);
        
        axios.get(`http://${host.ip}:3001/order/result/previous/${response.data[0].Patientlists[0].id}/${details.Sectionorders[0].section}`).then((response) => {
            setPrevResultData(response.data)
        })
        })
        
    }

    return (
        <tr className="patient-table">
                <td>{details.labNumber}</td>
                <td>{details.Patientlists[0].lastname}, {details.Patientlists[0].firstname} {details.Patientlists[0].middlename}</td>
                <td>{details.Sectionorders[0].tests}</td>
                <td onClick={selectHandler}>Select</td>
        </tr>
    )
}

export default ChemTr
