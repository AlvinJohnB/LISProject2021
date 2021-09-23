import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

import '../../components/ptregistration/ptreg.css'
import './orderdetails.css'
import DetailTr from './DetailTr'


function OrderDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState({})
    let { labNumber } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/order/getorder/${labNumber}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setOrderDetails(response.data);
            setIsLoading(false);
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
        <div className="labwrapper-orderdeats">
        <h1 className="labcontentheader-orderdeats">&nbsp; Order Details</h1>
            <div className="labdiv">
                <div className="labdivcontent p-10">
                    <h4 className="center">Lab Number {orderDetails[0].labNumber} </h4>
                    </div>
                    <br />
                    <div className="divblock p-10">
                    <strong>Name:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].lastname}, {orderDetails[0].Patientlists[0].firstname} {orderDetails[0].Patientlists[0].middlename}</p>
                    </div>

                    <div className="divblock p-10">
                    <strong>Age/Gender:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].age}/{orderDetails[0].Patientlists[0].gender}</p>
                    </div>

                    <div className="divblock p-10">
                    <strong>Requesting Physician:</strong> <p className="orderdetail">{orderDetails[0].reqDr}</p>
                    </div>
                <div className="divblock p-10">
                    <strong>Test/s Status:</strong>
                </div>
                <div className="divblock p-10">
                <table className="detailtable">
                    <tbody>
                        <tr className="header">
                            <th>Section LabNumber</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {orderDetails[0].Sectionorders.map((detail, index) => {
                            return (
                                <DetailTr detail={detail} key={index} />
                                )
                        })}
                    </tbody>
                </table>

                </div>
                <br />
                <br />
                <div className="divblock p-10">
                <button className="btn archive">Archive</button>
                <button className="btn delete">Delete</button>
                </div><br />
            </div>
        </div>
    )
}

export default OrderDetails
