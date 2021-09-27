import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import NotLoggedInModal from '../NotLoggedInModal'
import Ordersrow from './Ordersrow'
import ReactPaginate from 'react-paginate'
import '../../components/ptregistration/ptreg.css'
import LoadingModal from '../LoadingModal'
import { useState } from 'react'

function Orders() {

    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

    const [pageNumber, setPageNumber] = useState(0);
    const orderPerPage = 15;
    const pagesVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(orders.length / orderPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const displayOrders = orders.slice(pagesVisited, pagesVisited + orderPerPage).map((order) => {
        return (<Ordersrow key={order.id} order={order} />)
    })



    useEffect(() => {
        axios.get(`http://localhost:3001/order/getorders`).then((response) => {
            setOrders(response.data);
            setIsLoading(false);
        })
    },[])

    const filterOrders = (e) => {
        const table = document.querySelector("#ordertable");
        const tr = table.getElementsByTagName("tr");
        let filter = e.target.value.toUpperCase();
        

        if(tr){
            for(let i = 0; i < tr.length; i++){
                let td = tr[i].getElementsByTagName("td")[0]
                if(td){
                    let test = td.innerHTML || td.innerText
                    if(test.indexOf(filter) > -1){
                        tr[i].style.display = "";
                    }else{
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }


    if(isLoading){
        return(
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }

    return (
        <div className="labwrapper">
            <h1 className="labcontentheader-results">&nbsp; Orders</h1>
            <div className="labdiv">
                <div className="labdivcontent">
                    <label className="form-content">Search lab number:</label>
                    <input type="text" className="form-input" autoComplete="off" placeholder="Search Lab No..." onChange={filterOrders}/>
                    <br /><br />
                    <table className="tablelab" id="ordertable">
                        <tbody>
                            <tr className="header">
                                <th>Lab Number</th>
                                <th>Patient Name</th>
                                <th>Test/s Requested</th>
                                <th>Date Encoded</th>
                                <th>Action</th>
                            </tr>

                           {displayOrders}
                        </tbody>
                    </table>
                    <br />
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
                />
                </div>

            </div>
            <NotLoggedInModal /> 
        </div>
    )
}

export default Orders
