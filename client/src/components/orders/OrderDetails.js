import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer'
import host from '../../config.json'
import '../../components/ptregistration/ptreg.css'
import './orderdetails.css' 
import DetailTr from './DetailTr'
import GetFullResults from './GetFullResults';
import ChargeSlip from '../results/ChargeSlip';




function OrderDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState({})

    const [generateShow, setGenerateShow] = useState(false)

    let { labNumber } = useParams();
    let history = useHistory();

    const generateFullRx = () => {
        setGenerateShow(true)
    }


    useEffect(async () => {
        await axios.get(`http://${host.ip}:3001/order/getorder/${labNumber}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setOrderDetails(response.data); 
            setIsLoading(false);
        })
    },[labNumber])

    const onOrderDelete =  async () => {
        await axios.post(`http://${host.ip}:3001/order/labno/update`, {
            labNumber: orderDetails[0].labNumber,
            status: "DELETED"
        })
        alert("Order deleted");
        history.push('/orders')
    }

    if(isLoading){
        return(
            <div className="ptregwrapper">
            <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="container">
            <h4> Order Details</h4>                
                    <h6 className="center">Lab Number {orderDetails[0].labNumber} </h6>
                    <strong>Name:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].lastname}, {orderDetails[0].Patientlists[0].firstname} {orderDetails[0].Patientlists[0].middlename}</p>
                    

                    <strong>Age/Gender:</strong> <p className="orderdetail">{orderDetails[0].Patientlists[0].age}/{orderDetails[0].Patientlists[0].gender}</p>
                    

                    <strong>Requesting Physician:</strong> <p className="orderdetail">{orderDetails[0].reqDr}</p>
                    
                    <strong>Test/s Status:</strong>
                
                <table className="table  table-sm">
                    <tbody>
                        <tr className="table-secondary">
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
                {/*Generate Charge Slip*/}
                
                <PDFDownloadLink
                    document={<ChargeSlip data={orderDetails[0]}/>}
                    fileName={`CHARGE SLIP ${orderDetails[0].labNumber}`}
                    className="btn btn-primary"
                    data={orderDetails[0]}
                    >
                        {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : 'Generate Charge Slip'
                    }
                </PDFDownloadLink>
                {/* RELEASE FULL RESULTS */}
                <GetFullResults show={generateShow} setShow={setGenerateShow} forOrderID={orderDetails[0].labNumber} />
                {orderDetails[0].status === "RELEASED" && <button onClick={generateFullRx}  className="btn btn-success"> Generate Full Results</button>}
                {orderDetails[0].status !== "RELEASED" && <button onClick={onOrderDelete} className="btn btn-danger">Delete/Archive</button>}
                
            
        </div>
    )
}

export default OrderDetails
