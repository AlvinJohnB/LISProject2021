import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import host from '../../config.json'
import ReactPaginate from 'react-paginate';
import LoadingModal from '../LoadingModal';

const Searchresult = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [resultData, setResultData] = useState([])

    let history = useHistory();
    
    useEffect( async () => {

    await axios.get(`http://${host.ip}:3001/patient/findpatient/${props.patient.lastname},${props.patient.firstname},`).then((response) => {
        setResultData(response.data);
        setIsLoading(false);
    })

    },[props.patient])

    const [pageNumber, setPageNumber] = useState(0);
    const orderPerPage = 10;
    const pagesVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(resultData.length / orderPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }
    
    const onSelect = (e) => {
        const pId = e.target.id
        history.push(`/updatept/${pId}`)
    }
    const displayOrders = resultData.slice(pagesVisited, pagesVisited + orderPerPage).map((value) => {
        return (<tr className="patient-table" key={value.id}>
        <td onClick={onSelect} id={value.branchid}>{value.lastname}, {value.firstname} {value.middlename}</td>
        <td onClick={onSelect} id={value.branchid}>{value.age}</td>
        <td onClick={onSelect} id={value.branchid}>{value.gender}</td>
        <td onClick={onSelect} id={value.branchid}>{value.bday}</td>
    </tr>)
    })

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }

    return (
        <div className="container">
            <p>Patient Search result/s:</p>
            <div className="container">
            <table className="table table-hover">
                <tbody>
                    <tr className='table-success'>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                    </tr>
                    {displayOrders}
                </tbody>
            </table>
            <br />
            {pageCount > 1 &&                     
                        <ReactPaginate
                        previousLabel = {"<"}
                        nextLabel = {">"}
                        pageCount = {pageCount}
                        onPageChange={changePage}
                        containerClassName={"orders-pagination-bttns"}
                        previousLinkClassName={"orders-prevBttn"}
                        nextLinkClassName={"orders-nextbtn"}
                        disabledClassName={"orders-pgnte-disabled"}
                        activeClassName={"orders-pgninate-active"}
                    />}
            </div>
            
        </div>
    )
}

export default Searchresult
