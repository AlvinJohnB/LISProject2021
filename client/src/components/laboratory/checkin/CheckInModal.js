import React from 'react'
import './checkinmodal.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react'
import LabLoadingModal from '../../LabLoadingModal';
import host from '../../../config.json'


function CheckInModal(props) {

    let history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    

    if(isLoading === true){
        return (
            <LabLoadingModal />
        )
    }
    const onAccept = async () => {
        props.setShow(false);
        setIsLoading(true)
        // IF REJECTED
        if(props.selected[0].Sectionorders[0].status === "Sample Rejected - For Check-In"){

            await axios.post(`http://${host.ip}:3001/order/updatesorder`, {
                status: "RUNNING",
                sectNumber: props.selected[0].Sectionorders[0].sectNumber
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {

                if(response.data.error){
                    alert("You are not logged in, please log in!");
                    history.push("/login");
                }
                setIsLoading(false)
                props.setShow(false);

            })

        }else{

            await axios.post(`http://${host.ip}:3001/order/updatesorder`, {
                status: "RUNNING",
                sectNumber: props.selected[0].Sectionorders[0].sectNumber
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                if(response.data.error){
                    alert("You are not logged in, please log in!");
                    history.push("/login");
                }
            })
        
        const tests = props.selected[0].Sectionorders[0].tests;


        await axios.post(`http://${host.ip}:3001/order/form-create/${props.selected[0].Sectionorders[0].id}`, {
                tests: tests,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((res) => {
                if(res.data.error){
                    alert("You are not logged in, please log in!");
                    history.push("/login");
                }
                setTimeout(setIsLoading(false), 2000)
                
            })
        }

        await axios.get(`http://${host.ip}:3001/order/forcheckin/${props.section}`).then((response) => {
            props.setCheckInDetails(response.data);
        })
    }

    if(!props.show){
        return null
    }

    return (
        <div className="checkin-modal">
            <div className="checkin-modal-wrapper">
                <div className="checkin-modal-header">
                    <div><strong>Specimen Check-in Module:</strong></div>
                    <div className="checkin-closebtn" onClick={props.closeModal}>X</div>
                </div>
                    <div className="checkin-modal-body">
                        <p className="order-dits">
                            <strong>Patient Name:</strong> {props.selected[0].Patientlists[0].lastname}, {props.selected[0].Patientlists[0].firstname} {props.selected[0].Patientlists[0].middlename}<br />
                            <strong>Section:</strong> {props.selected[0].Sectionorders[0].section}<br />
                            <strong>Lab Number:</strong> {props.selected[0].Sectionorders[0].sectNumber}<br />
                            <strong>Test/s:</strong> {props.selected[0].Sectionorders[0].tests}
                        </p>
                    </div>
                <div className="checkin-modal-footer">
                        <input type="button" className="checkin-btn accept" value="Accept" onClick={onAccept}/>
                </div>
            </div>
        </div>
    )
}

export default CheckInModal
