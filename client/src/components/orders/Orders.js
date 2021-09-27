import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NotLoggedInModal from '../NotLoggedInModal'
import Ordersrow from './Ordersrow'

import '../../components/ptregistration/ptreg.css'
import LoadingModal from '../LoadingModal'


function Orders() {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

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
        <div className="ptregwrapper">
            <NotLoggedInModal />
            <br />
            <h1>Orders</h1>
            <hr />
            <label className="form-content">Search lab number:</label>
            <input type="text" className="form-input" autoComplete="off" placeholder="Search Lab No..." onChange={filterOrders}/>
            <br />
            <table className="table width50" id="ordertable">
                <tbody>
                    <tr className="header">
                        <th>Lab Number</th>
                        <th>Patient Name</th>
                        <th>Test/s Requested</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    {orders.map((order) => {
                        return (
                            <Ordersrow key={order.id} order={order} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Orders
