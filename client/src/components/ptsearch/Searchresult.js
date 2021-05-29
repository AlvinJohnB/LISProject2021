import React from 'react'
import axios from 'axios';
import { useEffect,  } from 'react';
import { useParams } from 'react-router-dom';



import '../ptregistration/ptreg.css';

const Searchresult = () => {
    let { param } = useParams();

    let dataArray = param.split(',');

    let searchData = {
        lastname: dataArray[0],
        firstname: dataArray[1]
    }


    useEffect(() => {

    axios.post('http://localhost:3001/patient/findpatient', searchData).then((response) => {
        console.log(response.data);
    })

    })
    return (
        <div className="ptsearchwrapper">
            {param}
        </div>
    )
}

export default Searchresult
