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


    useEffect(async ()=>{
      if(prevResultData || prevResultData == null){
        setIsLoading(false);
        await axios.post(`http://${host.ip}:3001/auth/pathofetch`).then((response) => {
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
        await axios.get(`http://${host.ip}:3001/order/section/Chemistry`).then((response) => {
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
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center">
                        <div><h4>Result Entry Module</h4></div>
                        <button type="button" class="btn-close"  onClick={closeModal}></button>
                        
                    </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                            <div classname="row">
                                <div>
                                    {resultFormData[0].Sectionorders[0].status === "RELEASED" && <h2 className="red">Released</h2>}
                                    <p>
                                        <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                                        <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                                        <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                                        {prevResultData != null && resultFormData[0].Sectionorders[0].status === "RUNNING" && prevResultData.length > 0 && <input onClick={prevResClick} type="button" value="Show previous result" className="btn btn-primary" />}
                                    </p>  
                                        {/* Prev Result Modal */}
                                        {prevResultData != null &&
                                        <PrevResultModal showPrevResModal={showPrevResModal} setShowPrevResModal={setShowPrevResModal} prevResultData={prevResultData} />}


                                        <br />
                                        <table className="table">
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
                                </div>
                                <div className="col-md-2 mt-2">
                                        <label>Pathologist:</label>
                                            <br />
                                        {resultFormData[0].Sectionorders[0].status === "RELEASED" && 
                                            <select  id="form-field" disabled={true}>
                                            <option>{resultFormData[0].Sectionorders[0].pathologist}</option>
                                            </select>
                                        }
                                        {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                                            <select  id="form-field" className="form-select" onChange={onSelectChange}>
                                            <option value="invalid">Select...</option>
                                            {patholist.map((patho, index) => {
                                                
                                                return(
                                                    <option key={index} value={patho.name}>{patho.name}</option>
                                                )
                                            })}
                                            </select>
                                        }
                                </div>

                                </div>
                            </div>
                        
                    <div className="modal-footer">
                    
                            <br /><br />
                            {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                                <input type="button" onClick={onRelease} className="btn btn-primary col-md-1" value="Release"/>
                            }
                            {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                            <input type="button" onClick={undoCheckIn} className="btn btn-danger" value="Undo Check-in/Reject sample" />
                            }
                            {resultFormData[0].Sectionorders[0].status === "RELEASED" && <input type="button" onClick={onUndoRelease} className="btn btn-danger" value="Undo Release" />}
                </div>
                </div>
            </div>
        </div>
    )
}

export default ChemResultmodal
