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
import PrintPrevModal from './PrintPrevModal';




function OrderDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState({})
    const [generateShow, setGenerateShow] = useState(false)
    const [prevModalShow, setPrevModalShow] = useState(false)

    const [PrevResData, setPrevResData] = useState([])
    const [prevResDetails, setPrevResDetails] = useState({})
    const [hasPrev, setHasPrev] = useState(false)
    const [includePrev, setIncludePrev] = useState(false)
   
    

    let { labNumber } = useParams();
    let history = useHistory();

    const generateFullRx = () => {
        setGenerateShow(true)
    }

    const ModalPrevShow = () => {
        if(hasPrev === true){
            setPrevModalShow(true)
        }else{
            setGenerateShow(true)
        }
    }

    // Prev Modal Handler


    useEffect(async () => {
        await axios.get(`http://${host.ip}:3001/order/getorder/${labNumber}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setOrderDetails(response.data); 
            const dataSet = response.data
            
            axios.get(`http://${host.ip}:3001/order/result/previous/${response.data[0].Patientlists[0].id}`).then((response) => {
            
            // Logic here, filter json from date of relase of current
            const presults = response.data
            const resDate = new Date(dataSet[0].createdAt)
        
            const filteredResults = presults.filter((result) => {
                const resultDate = new Date(result.createdAt)
                return resultDate < resDate
            })
        
            if(filteredResults.length >= 1){
                setHasPrev(true)

                // Previous Data here

                setPrevResDetails(filteredResults[0])
                let chemResData = {}
                let hemaResData = {}
                let cmResData = {}
                let seroResData = {}

                const data = filteredResults[0].Sectionorders
      
                const chemData = data.filter((item) => item.section === "Chemistry")
                const hemaData = data.filter((item) => item.section === "Hematology")
                const cmData = data.filter((item) => item.section === "CM")
                const seroData = data.filter((item) => item.section === "Serology")
      
              
      
                if(chemData.length !== 0){
                  chemResData = chemData[0].Sectionresults
                }
                if(hemaData.length !== 0){
                  hemaResData = hemaData[0].Sectionresults
                }
                if(cmData.length !== 0){
                  cmResData = cmData[0].Sectionresults
                }
                if(seroData.length !== 0){
                  seroResData = seroData[0].Sectionresults
                }
                
                const merge = [].concat(chemResData, hemaResData, cmResData, seroResData)
                setPrevResData(merge)
            }else{
                setHasPrev(false)
            }


            setIsLoading(false)
             })

           
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
                                <DetailTr hasPrev={hasPrev} prevResDetails={prevResDetails} PrevResData={PrevResData} setPrevModalShow={setPrevModalShow} includePrev={includePrev} detail={detail} key={index} />
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
                <GetFullResults includePrev={includePrev} prevResDetails={prevResDetails} PrevResData={PrevResData} show={generateShow} setShow={setGenerateShow} forOrderID={orderDetails[0].labNumber} />
                
                <PrintPrevModal generateFullRx={generateFullRx} setIncludePrev={setIncludePrev} setShow={setPrevModalShow} show={prevModalShow} />
                
                {orderDetails[0].status === "RELEASED" && <button onClick={()=>{generateFullRx(); ModalPrevShow()}}  className="btn btn-success"> Generate Full Results</button>}
                {orderDetails[0].status !== "RELEASED" && <button onClick={onOrderDelete} className="btn btn-danger">Delete/Archive</button>}
                
            
        </div>
    )
}

export default OrderDetails
