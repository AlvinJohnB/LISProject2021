import React from 'react'
import './checkinmodal.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function CheckInModal(props) {
    const history = useHistory();


    const onAccept = async () => {

        await axios.post("http://localhost:3001/order/updatesorder", {
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

        // create result form
        
        const etests = props.selected[0].Sectionorders[0].tests;
        const expTests = etests.split(" ");

        expTests.pop();
        for (let i = 0; i < expTests.length; i++){

            console.log(`${expTests[i]} checked in`);

            await axios.post(`http://localhost:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
            test: expTests[i],
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in, please log in!");
                history.push("/login");
            }else{
                console.log(`FrontEND Success ${expTests[i]}`)

            }
        })

        if(expTests[i] === "LIPID"){

            await axios.post(`http://localhost:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                test: "CHOLE",
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
            
            await axios.post(`http://localhost:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                test: "TRIG",
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })

            await axios.post(`http://localhost:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                test: "HDL",
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })

            await axios.post(`http://localhost:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                test: "LDL",
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            })
        }

        }
        console.log(expTests);

        await axios.get(`http://localhost:3001/order/forcheckin/${props.section}`).then((response) => {
            props.setCheckInDetails(response.data);
        })
        props.setShow(false);
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
                        <input type="button" className="checkin-btn reject" value="Reject"/>
                </div>
            </div>
        </div>
    )
}

export default CheckInModal
