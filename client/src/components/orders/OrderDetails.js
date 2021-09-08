import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

import '../../components/ptregistration/ptreg.css'
import './orderdetails.css'


function OrderDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState({})
    let { labNumber } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/order/getorder/${labNumber}`).then((response) => {
            setOrderDetails(response.data);
            setIsLoading(false);
            console.log(response.data)
        })
    },[labNumber])


    if(isLoading){
        return(
            <div className="ptregwrapper">
            <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="ptregwrapper">
            <br />
            <hr />
            <br />
            <div className="orderdetailsdiv">
                    <div className="divblock">
                    <h3 className="center">Order Details for Lab Number {orderDetails[0].labNumber} </h3>
                    </div>
                    <br />
                    <div className="divblock">
                    <strong>Name:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].lastname}, {orderDetails[0].Patientlists[0].firstname} {orderDetails[0].Patientlists[0].middlename}</p>
                    </div>

                    <div className="divblock">
                    <strong>Age/Gender:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].age}/{orderDetails[0].Patientlists[0].gender}</p>
                    </div>

                    <div className="divblock">
                    <strong>Requesting Physician:</strong> <p className="orderdetail">{orderDetails[0].reqDr}</p>
                    </div>

                <br />
                <br />
                <div className="divblock">
                    <strong>Test/s Status:</strong>
                </div>
                <table className="detailtable">
                    <tbody>
                        <tr className="header">
                            <th>Section LabNumber</th>
                            <th>Status</th>
                        </tr>
                        {orderDetails[0].Sectionorders.map((detail) => {
                            return (
                            <tr>
                                <td>{detail.sectNumber}</td>
                                <td>{detail.status}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>

                <button className="btn archive">Archive</button>
                <button className="btn delete">Delete</button>
            </div>
        </div>
    )
}

export default OrderDetails
