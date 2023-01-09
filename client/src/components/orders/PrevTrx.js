import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../../components/ptregistration/ptreg.css'
import './orderdetails.css'
import PrevTrxTr from './PrevTrxTr'
import host from '../../config.json'

function PrevTrx() {

    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState([])
    let { pId } = useParams();


    useEffect(async () => {
        await axios.get(`http://${host.ip}:3001/order/trx/prev/${pId}`).then((response) => {
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
        <div className="container">
            <h3>Previous Orders</h3>
                <h6 className="center">Showing Previous Transactions of</h6>
                    <strong>Name:</strong> <p className="orderdetail">{orderDetails[0].lastname}, {orderDetails[0].firstname} {orderDetails[0].middlename}</p>
                    <strong>Age/Gender:</strong> <p className="orderdetail">{orderDetails[0].age}/{orderDetails[0].gender}</p>
                    <strong>Transaction/s:</strong>

                    <div className="row">
                        <table className="table table-hover">
                            <tbody>
                                <tr className="table-secondary">
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
                
        </div>
    )
}

export default PrevTrx
