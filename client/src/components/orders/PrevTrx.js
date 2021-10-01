import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../../components/ptregistration/ptreg.css'
import './orderdetails.css'
import PrevTrxTr from './PrevTrxTr'


function PrevTrx() {

    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState([])
    let { pId } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3001/order/trx/prev/${pId}`).then((response) => {
            setOrderDetails(response.data);
            setIsLoading(false);
        })
    },[pId])

    if(isLoading){
        return(
            <div className="ptregwrapper">
            <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="labwrapper-orderdeats">
        <h1 className="labcontentheader-orderdeats">&nbsp;Prev Orders</h1>
            <div className="labdiv">
                <div className="labdivcontent p-10">
                    <h4 className="center">Showing Previous Transactions of</h4>
                    </div>
                    <div className="divblock p-10">
                    <strong>Name:</strong> <p className="orderdetail">{orderDetails[0].lastname}, {orderDetails[0].firstname} {orderDetails[0].middlename}</p>
                    </div>

                    <div className="divblock p-10">
                    <strong>Age/Gender:</strong> <p className="orderdetail">{orderDetails[0].age}/{orderDetails[0].gender}</p>
                    </div><br />

                <div className="divblock p-10">
                    <strong>Transaction/s:</strong>
                </div>
                <div className="divblock p-10">
                <table className="detailtable">
                    <tbody>
                        <tr className="header">
                            <th>Laboratory Number</th>
                            <th>Date</th>
                            <th>Test/s</th>
                        </tr>
                        {orderDetails[0].Orders.map((detail, index) => {
                            return (
                                <PrevTrxTr detail={detail} key={index} />
                                )
                        })}
                    </tbody>
                </table>

                </div>
                <br />
                <br />
                <div className="divblock p-10">
                </div><br />
            </div>
        </div>
    )
}

export default PrevTrx
