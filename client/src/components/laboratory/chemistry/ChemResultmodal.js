import React from 'react'
import './chemresult.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
import ChemTest from './ChemTest'
import { useHistory } from 'react-router-dom';
import PrevResultModal from './PrevResultModal';
import host from '../../../config.json'
import Modal from 'react-bootstrap/Modal'
import LabLoadingModal from '../../LabLoadingModal';
import Selectsize from '../../orders/Selectsize';

    function ChemResultmodal ({setSectionData, showPrevResModal, setShowPrevResModal, setPrevResultData, prevResultData, setSectionResultArray,setResultFormData, setShow, show, closeModal, resultFormData, sectionResultArray} ) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [patholist, setPatho] = useState();
    const [performerList, setPerformerList] = useState();
    const [pathoSelected, setPathoSelected] = useState("invalid");
    const [performer, setPerformer] = useState();

    const [showSize, setShowSize] = useState(false);

    let history = useHistory();

    const showSelectSize = async () => {
        setShowSize(true) 
    }


    useEffect(async ()=>{
      if(prevResultData || prevResultData == null){
        setIsLoading(false);
        await axios.post(`http://${host.ip}:3001/auth/pathofetch`).then((response) => {
            setPatho(response.data);
        })
        await axios.post(`http://${host.ip}:3001/auth/fetchperformer`).then((response) => {
            setPerformerList(response.data);
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

        await axios.post(`http://${host.ip}:3001/order/result/release/${sectOrderID}/RELEASED`, {pathologist: pathoSelected, performedBy: performer},
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

    const performerSet = (e) => {
        setPerformer(e.target.value)
}

    const handleShow = ()=> {
        setShow(false)
    }
    

    if(!show){
        return null
    }

    if(isLoading){
        return (
            <>
                <LabLoadingModal />
            </>
        )
    }

    
    return (
        <>
            <Modal
            show={show}
            onHide={handleShow}
            backdrop="static"
            keyboard={false}
            size="xl"
            >
            <Modal.Header closeButton>
                <Modal.Title>Result Entry Module</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className='mobresform'>
                            {resultFormData[0].Sectionorders[0].status === "RELEASED" && <h2 className="red">Released</h2>}
                            <p>
                                <strong>Patient Name:</strong> {resultFormData[0].Patientlists[0].lastname}, {resultFormData[0].Patientlists[0].firstname} {resultFormData[0].Patientlists[0].middlename}<br />
                                <strong>Section:</strong> {resultFormData[0].Sectionorders[0].section}<br />
                                <strong>Section Number:</strong> {resultFormData[0].Sectionorders[0].sectNumber}<br />
                                {prevResultData != null &&  prevResultData.length > 0 && <input onClick={prevResClick} type="button" value="Show previous result" className="btn btn-primary" />}
                                {resultFormData[0].Sectionorders[0].status === "RELEASED" && <input type="button" onClick={showSelectSize} className="btn btn-success" value = "Print result" />}
                            </p>  
                                {/* Prev Result Modal */}
                                {prevResultData != null &&
                                <PrevResultModal showPrevResModal={showPrevResModal} setShowPrevResModal={setShowPrevResModal} prevResultData={prevResultData} />}
<<<<<<< Updated upstream


                                <br />
                                <table className="table">
=======
                                
                                {/* Notes */}
                                <Notesmodal orderID={resultFormData[0].id} show={noteModalShow} setShow={setNoteModalShow} />
                                
                                
                               
                                <Diagnosis setAddDxShow={setAddDxShow} dx={dx} setDeleteDxShow={setDeleteDxShow} setDxDeleteID={setDxDeleteID} deleteDx={deleteDx} />
                                <Adddx isLab={true} setShow={setAddDxShow} show={addDxShow} ptID={resultFormData[0].Patientlists[0].branchid}/>
                                <Deletedx setShow={setDeleteDxShow} deleteDx={deleteDx} dxDeleteID={dxDeleteID} show={deleteDxShow} />




                                <table className="table table-sm">
>>>>>>> Stashed changes
                                    <tbody>
                                        <tr className="table-secondary mobresform">
                                            <th>Test</th>
                                            <th>Result</th>
                                            <th>Unit</th>
<<<<<<< Updated upstream
                                            <th>Reference</th>
=======
                                            <th className='mob'>Reference</th>
                                            <th>Test comment</th>
>>>>>>> Stashed changes
                                        </tr>
                                        
                                        {sectionResultArray.map((test, index) => {
                                        return(
                                        <ChemTest key={index} status={resultFormData[0].Sectionorders[0].status} ptdata={resultFormData[0].Patientlists[0]} test={test} />
                                        )
                                    })}
<<<<<<< Updated upstream
                                    </tbody>
                                </table>
=======

                                     </tbody>
                                </table>
                                <strong>Global Comment:</strong><br />
                                    <textarea onBlur={saveSectionComment} placeholder={`${resultFormData[0].Sectionorders[0].sectionComment}`} rows={1} cols={30}></textarea>
                                   

>>>>>>> Stashed changes
                            </div>
                        </div>
                        <div className="d-flex">
                        
                            <div className="col-md-2 mt-2 me-3">
                                    <strong className='mobresform'>Pathologist:</strong>
                                        <br />
                                    {resultFormData[0].Sectionorders[0].status === "RELEASED" && 
                                        <select  id="form-field" className="form-select" disabled={true}>
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

                            <div className="col-md-6 mt-2">
                                    <strong className='mobresform'>Performed by:</strong>
                                        <br />
                                    {resultFormData[0].Sectionorders[0].status === "RELEASED" && 
                                        <select  id="form-field" disabled={true} className="form-select">
                                        <option>{resultFormData[0].Sectionorders[0].performedBy}</option>
                                        </select>
                                    }
                                    {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                                        <select  id="form-field" className="form-select" onChange={performerSet}>
                                        <option value="invalid">Select...</option>
                                        {performerList.map((performer, index) => {
                                            
                                            return(
                                                <option key={index} value={performer.name}>{performer.name}</option>
                                            )
                                        })}
                                        </select>
                                    }
                            </div>
                        </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                    <input type="button" onClick={onRelease} className="btn btn-primary" value="Release"/>
                }
                {resultFormData[0].Sectionorders[0].status === "RUNNING" && 
                <input type="button" onClick={undoCheckIn} className="btn btn-danger" value="Undo Check-in/Reject sample" />
                }
                {resultFormData[0].Sectionorders[0].status === "RELEASED" && <input type="button" onClick={onUndoRelease} className="btn btn-danger col-md-4" value="Undo Release" />}
            </Modal.Footer>
            </Modal>

            {/* Select Size */}
            {resultFormData[0].Sectionorders[0].status === "RELEASED" &&
                <Selectsize show={showSize} setShow={setShowSize} forOrderID={resultFormData[0].Sectionorders[0].forOrderID} section={resultFormData[0].Sectionorders[0].section} detail={resultFormData[0].Sectionorders[0]}/>
            }
        </>
       
    )
}

export default ChemResultmodal
