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
        setIsLoading(true);
        props.setShow(false);

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

        // create result form
        
        const etests = props.selected[0].Sectionorders[0].tests;
        const expTests = etests.split(" ");
        expTests.pop();

        for (let i = 0; i < expTests.length; i++){

            console.log(`${expTests[i]} checked in`);

        // IF PROFILE
        // Chemistry Profiles
            if(expTests[i] === "LIPID"){
                const test = ["LIPID","CHOLE","TRIG","HDL","LDL"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            else if(expTests[i] === "TPAG"){
                const test = ["TPAG","TOTCHO","TALB","GLOB","ALBGL"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            else if(expTests[i] === "OGTT75"){
                const test = ["OGTT75","OGFBS","OG1HR","OG2ND"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }

            // CM Profiles
            else if(expTests[i] === "URINAL"){
                const test = ["URINAL","URINPHY","UCOLOR","UTRANS","UCHEM","UPH","USG","UCHON","UGLU","UWBC","UBLD","UROBIL", "UBILI", "UNIT", "UKET", "URINMIC", "UPUS", "UMRBC", "UECLS", "UMAM", "UMUC", "UMBAC", "UCASTS", "UCRYS", "UPARA", "UMOTH"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            else if(expTests[i] === "FECA"){
                const test = ["FECA","FPHYS","FCOL", "FCONSIS", "FMICRO", "FPUS", "FBLO","FECPARA"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 1500)
            }
            // Hema Profiles
            else if(expTests[i] === "CBCPLT"){
                const test = ["CBCPLT","WBCCT","GRNCT","LYMPCT","MID","RBCCT","HGB","HCT","MCV","MCH","MCHC","PLTCT"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            else if(expTests[i] === "Hgb/Hct"){
                const test = ["HGB","HCT"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            else if(expTests[i] === "PTINR"){
                const test = ["PTINR","PT","CONT","PTACT","INR"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }
            // Sero Profiles
            else if(expTests[i] === "DNGBLT"){
                const test = ["DNGBLT","DENGIGG", "DENGIGM"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }

            else if(expTests[i] === "TYPHI"){
                const test = ["TYPHI","TYPHIGG", "TYPHIGM"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }

            else if(expTests[i] === "BTYPE"){
                const test = ["BTYPE","ABO","RH"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }

            else if(expTests[i] === "CROSSM"){
                const test = ["CROSSM","REAB","RERH", "COMP", "PUR", "BLSER", "TUB", "BEXTR", "BEXP", "BLSRC", "MAJCX", "MINORCX"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }

            else if(expTests[i] === "ABOPC"){
                const test = ["ABOPC","ABPC","BLSER", "BEXTR", "BEXP", "BLSRC"]
                setTimeout(async () => {
                    for(let i=0; i<test.length; i++){
                        await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
                            test: test[i],
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken")
                            }
                        })  
                    }
                }, 500)
            }


            //MircroProfiles
        else { await axios.post(`http://${host.ip}:3001/order/form/result/create/${props.selected[0].Sectionorders[0].id}`, {
            test: expTests[i],
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })}

        }
        }



        
        await axios.get(`http://${host.ip}:3001/order/forcheckin/${props.section}`).then((response) => {
            props.setCheckInDetails(response.data);
        })
        setTimeout(()=>{setIsLoading(false);}, 1000)
        setIsLoading(false);

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
