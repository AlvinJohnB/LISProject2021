import React from 'react'
import './chemresult.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
import ChemTest from './ChemTest'
import { useHistory } from 'react-router-dom';
import PrevResultModal from './PrevResultModal';
import host from '../../../config.json'

    function ChemResultmodal ({setSectionData, showPrevResModal, setShowPrevResModal, setPrevResultData, prevResultData, setSectionResultArray,setResultFormData, show, closeModal, resultFormData, sectionResultArray} ) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [patholist, setPatho] = useState();
    const [pathoSelected, setPathoSelected] = useState("invalid");

    let history = useHistory();


    useEffect(()=>{
      if(prevResultData || prevResultData == null){
        setIsLoading(false);
        axios.post(`http://${host.ip}:3001/auth/pathofetch`).then((response) => {
            setPatho(response.data);
        })
      }

    },[prevResultData])

    const prevResClick = () => {
        setShowPrevResModal(true);
    }

    const onRelease = async () => {
        if(pathoSelected === "invalid"){
            alert("Please select pathologist before releasing!")
        }else{
            const sectOrderID = resultFormData[0].Sectionorders[0].id;

        await axios.post(`http://${host.ip}:3001/order/result/release/${sectOrderID}/RELEASED`, {pathologist: pathoSelected} ,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }
        }).catch((err) => {
            console.log(err);
        })

        // RE RENDER DATA
        

        await axios.get(`http://${host.ip}:3001/order/resultform/${resultFormData[0].labNumber}/${resultFormData[0].Sectionorders[0].section}`).then((response) => {
            setResultFormData(response.data);
            setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
        })

        //CHECK IF ALL TESTS COMPLETED
        await axios.post(`http://${host.ip}:3001/order/check/${resultFormData[0].labNumber}`).then((response) => {
        })
        }
    }

    const undoCheckIn = async () => {
        await axios.post(`http://${host.ip}:3001/order/updatesorder`, {
            sectNumber: resultFormData[0].Sectionorders[0].sectNumber,
            status: "Sample Rejected - For Check-In"
        }, {
            headers:{
                    accessToken: localStorage.getItem("accessToken"),
            }
        })

        //Rerender Data
        axios.get(`http://${host.ip}:3001/order/section/Chemistry`).then((response) => {
            setSectionData(response.data);
        })

        closeModal();
    }

    const onUndoRelease = async () => {
        setPathoSelected("invalid")
        const sectOrderID = resultFormData[0].Sectionorders[0].id

        await axios.post(`http://${host.ip}:3001/order/result/release/${sectOrderID}/RUNNING`, {pathologist: null},
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }
        }).catch((err) => {
            console.log("Record not updated");
        })

        // RE RENDER DATA

        await axios.get(`http://${host.ip}:3001/order/resultform/${resultFormData[0].labNumber}/${resultFormData[0].Sectionorders[0].section}`).then((response) => {
            setResultFormData(response.data);
            setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
        })

        //CHECK IF ALL TESTS COMPLETED
        await axios.post(`http://${host.ip}:3001/order/check/${resultFormData[0].labNumber}`).then((response) => {

        })
    }

    const onSelectChange = (e) => {
        setPathoSelected(e.target.value)
    }

    

    if(!show){
        return null
    }

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="checkin-modal">
            <div className="result-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Result Entry for Lab Number: {resultFormData[0].labNumber}</strong></div>
                    <div className="checkin-closebtn" onClick={closeModal}>X</div>
                </div>
                    <div className="lab-modal-body">
                        {resultFormData[0].Sectionorders[0].status === "RELEASED" && <h2 className="red">Released</h2>}
                        <p className="order-dits">
                            <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                            <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                            {prevResultData != null && resultFormData[0].Sectionorders[0].status === "RUNNING" && prevResultData.length > 0 && <input onClick={prevResClick} type="button" value="Show previous result" className="checkin-btn reject" />}
                        </p>  
                            {/* Prev Result Modal */}
                            {prevResultData != null &&
                            <PrevResultModal showPrevResModal={showPrevResModal} setShowPrevResModal={setShowPrevResModal} prevResultData={prevResultData} />}


                            <br />
                            <table className="tablelab">
                                <tbody>
                                    <tr className="labheader">
                                        <th>Test</th>
                                        <th>Result</th>
                                        <th>Unit</th>
                                        <th>Reference</th>
                                    </tr>
                                    
                                    {sectionResultArray.map((test, index) => {
                                    return(
                                    <ChemTest key={index} status={resultFormData[0].Sectionorders[0].status} ptdata={resultFormData[0].Patientlists[0]} test={test} />
                                    )
                                })}
                                </tbody>
                            </table>
                    </div>
                <div className="res-footer">
                    <label>Pathologist:</label>
                                <br />
                            {resultFormData[0].Sectionorders[0].status === "RELEASED" && 
                                <select  id="form-field" disabled={true}>
                                <option>{resultFormData[0].Sectionorders[0].pathologist}</option>
                                </select>
                            }
                            {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                                <select  id="form-field" onChange={onSelectChange}>
                                <option value="invalid">Select...</option>
                                {patholist.map((patho, index) => {
                                    
                                    return(
                                        <option key={index} value={patho.name}>{patho.name}</option>
                                    )
                                })}
                                </select>
                            }
                            <br /><br />
                            {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                                <input type="button" onClick={onRelease} className="checkin-btn accept" value="Release"/>
                            }
                            {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                            <input type="button" onClick={undoCheckIn} className="checkin-btn reject" value="Undo Check-in/Reject sample" />
                            }
                            {resultFormData[0].Sectionorders[0].status === "RELEASED" && <input type="button" onClick={onUndoRelease} className="checkin-btn reject" value="Undo Release" />}
                </div>
            </div>
        </div>
    )
}

export default ChemResultmodal
