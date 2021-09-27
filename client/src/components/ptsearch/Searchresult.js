import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';


import '../ptregistration/ptreg.css';
import LoadingModal from '../LoadingModal';

const Searchresult = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState({})

    let { param } = useParams();
    let history = useHistory();
    
    useEffect(() => {

    axios.get(`http://localhost:3001/patient/findpatient/${param}`).then((response) => {

        setResultData(response.data);
        setIsLoading(false);
    })

    },[param])

    const onSelect = (e) => {
        const pId = e.target.id
        history.push(`/updatept/${pId}`)
    }

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }

    return (
        <div className="ptregwrapper">
            <h3>Patient Search result/s:</h3>
            <hr />
            <div className="tablewrapper">
            <table className="table">
                <tbody>
                    <tr className="header">
                        <td>Name</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Birthday</td>
                    </tr>
                    {resultData.map((value) => {
                        return<tr className="tbcontent" key={value.id}>
                            <td onClick={onSelect} id={value.branchid}>{value.lastname}, {value.firstname} {value.middlename}</td>
                            <td onClick={onSelect} id={value.branchid}>{value.age}</td>
                            <td onClick={onSelect} id={value.branchid}>{value.gender}</td>
                            <td onClick={onSelect} id={value.branchid}>{value.bday}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <p className="tablefooter"><Link to="/ptsearch">Back to Patient Search</Link></p>
            </div>
            
        </div>
    )
}

export default Searchresult
