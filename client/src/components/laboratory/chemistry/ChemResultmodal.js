import React from 'react'
import './chemresult.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
import ChemTest from './ChemTest'
import { useHistory } from 'react-router-dom';
import PrevResultModal from './PrevResultModal';

    function ChemResultmodal ({showPrevResModal, setShowPrevResModal, setPrevResultData, prevResultData, setSectionResultArray,setResultFormData, show, closeModal, resultFormData, sectionResultArray} ) {
    
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();

    useEffect(()=>{
      if(prevResultData || prevResultData == null){
        setIsLoading(false);
      }
    },[prevResultData])

    const prevResClick = () => {
        setShowPrevResModal(true);
    }

    const onRelease = async () => {

        const sectOrderID = resultFormData[0].Sectionorders[0].id

        await axios.post(`http://localhost:3001/order/result/release/${sectOrderID}/RELEASED`,
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

        await axios.get(`http://localhost:3001/order/resultform/${resultFormData[0].labNumber}`).then((response) => {
            setResultFormData(response.data);
            setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
        })
    }

    const onUndoRelease = async () => {

        const sectOrderID = resultFormData[0].Sectionorders[0].id

        await axios.post(`http://localhost:3001/order/result/release/${sectOrderID}/RUNNING`,
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

        await axios.get(`http://localhost:3001/order/resultform/${resultFormData[0].labNumber}`).then((response) => {
            setResultFormData(response.data);
            setSectionResultArray(response.data[0].Sectionorders[0].Sectionresults);
            console.log(response.data[0].Sectionorders[0].Sectionresults)
        })
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
            <div className="checkin-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Result Entry for Lab Number: {resultFormData[0].labNumber}</strong></div>
                    <div className="checkin-closebtn" onClick={closeModal}>X</div>
                </div>
                    <div className="checkin-modal-body">
                        <p className="order-dits">
                            <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                            <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                            {resultFormData[0].Sectionorders[0].status === "RELEASED" && <h2 className="red">Released</h2>}
                            {prevResultData != null && resultFormData[0].Sectionorders[0].status === "RUNNING" && <input onClick={prevResClick} type="button" value="Show previous result" className="checkin-btn reject" />}
                            
                            {/* Prev Result Modal */}
                            {prevResultData != null &&
                            <PrevResultModal showPrevResModal={showPrevResModal} setShowPrevResModal={setShowPrevResModal} prevResultData={prevResultData} />}


                            <br />
                            </p>
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
                        

                        {resultFormData[0].Sectionorders[0].status === "RUNNING" && <input type="button" onClick={onRelease} className="checkin-btn accept" value="Release" />}
                        {resultFormData[0].Sectionorders[0].status === "RELEASED" && <input type="button" onClick={onUndoRelease} className="checkin-btn reject" value="Undo Release" />}
                    </div>
                <div className="checkin-modal-footer">
                </div>
            </div>
        </div>
    )
}

export default ChemResultmodal
