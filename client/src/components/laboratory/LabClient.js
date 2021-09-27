import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'


import './lab.css'
import Header from '../Header';
import LabNav from './LabNav';
import CheckInTr from './checkin/CheckInTr';
import CheckInModal from './checkin/CheckInModal';
import NotLoggedInModal from '../NotLoggedInModal';
import LabLoadingModal from '../LabLoadingModal';


function LabClient() {

    const [isLoading, setIsLoading] = useState(true);
    const [checkInDetails, setCheckInDetails] = useState([]);
    const [section, setSection] = useState("Chemistry");
    const [show, setShow] = useState(false);
    const [orderid, setOrderID] = useState(0);
    const [selected, setSelected] = useState([  {
                                                    "id": 3,
                                                    "reqDr": "N/A",
                                                    "testsRequested": "FBS LIPID CBCPLT URINAL ",
                                                    "encodedBy": "ALVINJOHNEB",
                                                    "labNumber": "CAM-2021-9-3",
                                                    "status": "PENDING",
                                                    "createdAt": "2021-09-05T11:54:30.000Z",
                                                    "updatedAt": "2021-09-05T11:54:30.000Z",
                                                    "forPtId": 1,
                                                    "Sectionorders": [
                                                    {
                                                        "id": 4,
                                                        "sectNumber": "(CHEM)-CAM-2021-9-3",
                                                        "section": "Chemistry",
                                                        "tests": "FBS LIPID ",
                                                        "status": "FOR CHECK-IN",
                                                        "updatedBy": "ALVINJOHNEB",
                                                        "createdAt": "2021-09-05T11:54:30.000Z",
                                                        "updatedAt": "2021-09-05T11:54:30.000Z",
                                                        "forOrderID": 3
                                                    }
                                                    ],
                                                    "Patientlists": [
                                                    {
                                                        "id": 1,
                                                        "branchid": "CAMILLUS-1",
                                                        "lastname": "Bregana",
                                                        "firstname": "Alvin John",
                                                        "middlename": "Edra",
                                                        "gender": "Male",
                                                        "bday": "1999-10-30",
                                                        "age": 23,
                                                        "address": "Aguitap",
                                                        "phone": "09997725143",
                                                        "idenno": "2151607",
                                                        "createdAt": "2021-09-05T09:46:28.000Z",
                                                        "updatedAt": "2021-09-05T11:53:37.000Z",
                                                        "Orderlist": {
                                                        "PatientlistId": 1,
                                                        "OrderId": 3
                                                        }
                                                    }
                                                    ]
                                                }]);

                                               

    useEffect(() => {

        axios.get(`http://localhost:3001/order/forcheckin/Chemistry`).then((response) => {
            setCheckInDetails(response.data);
            setSection("Chemistry");
            setIsLoading(false);
        })

    }, [])


    useEffect(() => {
        axios.get(`http://localhost:3001/order/getorder/id/${orderid}/${section}`).then((response) => {
            if(response.data.length === 1){
             setSelected(response.data);
             setIsLoading(false);
            }
         })
     },[orderid, section])



    const sectionHandler = (e) => {
        const section = e.target.value;
        setSection(section);

        axios.get(`http://localhost:3001/order/forcheckin/${section}`).then((response) => {
            setCheckInDetails(response.data);
        })
    }

    const showModal = () =>{
        setShow(true);
    }

    const closeModal = () =>{
        setShow(false);
    }

    if(isLoading){
        return (
            <div className="ptregwrapper">
               <LabLoadingModal />
            </div>
        )
    }

    return (
        <div className="wrapper">
            <NotLoggedInModal />
            <Header />
            <LabNav />
              <section>
              <div className="ptregwrapper">

                <div className="labwrapper">

                        <h1 className="labcontentheader">Specimen Check-in</h1>

                        
                        <div className="labdiv">
                            <div className="labdivcontent">
                                <div className="labdiv-flex-block">
                                    <div className="mr-10">
                                        <label>Section:</label><br />
                                        <select onChange={sectionHandler}>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Hematology">Hematology</option>
                                            <option value="CM">Clinical Microscopy</option>
                                            <option value="Serology">Serology</option>
                                        </select>
                                    </div>

                                    <div className="mr-10">
                                        <label>Filter:</label><br />
                                        <input type="text" placeholder="Enter lab no..." />
                                    </div>

                                    <div className="mr-10">
                                        <input className="btn filter" type="button" value="Filter" />
                                    </div>
                                </div>
                                <br />
                                <table className="tablelab">
                                    <tbody>
                                        <tr className="labheader">
                                            <th>LabNumber</th>
                                            <th>Client Name</th>
                                            <th>Test/s</th>
                                            <th>Action</th>
                                        </tr>
                                        {checkInDetails.map((details) => {
                                        return(
                                            <CheckInTr 
                                                details={details} 
                                                key={details.id}
                                                setShow={setShow} 
                                                setOrderID={setOrderID}
                                            />
                                        )
                                    })}

                                    </tbody>
                                </table>


                            </div>
                        </div>
                        
                </div>
             </div>
             <CheckInModal
                show={show}
                showModal={showModal}
                closeModal={closeModal}
                selected={selected}
                setShow={setShow}
                section={section}
                setCheckInDetails={setCheckInDetails}
                />
             </section>
              <footer>Laboratory Information System by Bregs</footer>
        </div>
    )
}

export default LabClient
