import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Testrow from './Testrow';
import { useParams, useHistory } from 'react-router-dom';
import host from '../../config.json'


import Addordermodal from './Addordermodal'
import '../../components/ptregistration/ptreg.css'
import './modal.css'
import LoadingModal from '../LoadingModal';


const Addorder = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [testData, setTestData] = useState([])
    const [show, setShow] = useState(false)
    const [tests, setTests] = useState([])
    const [labTestInput, setLabTestInput] = useState("")
    const [ptData, setPtData] = useState({})
    const [labNumberInput, setLabNumberInput] = useState("")
    const [lastOrderIdData, setLastOrderIdData] = useState({})
    
    const [hemaTests, setHemaTests] = useState([])
    const [hemaTestsInput, setHemaTestsInput] = useState("")
    const [cmTests, setCmTests] = useState([])
    const [cmTestsInput, setCmTestsInput] = useState("")
    const [chemTests, setChemTests] = useState([])
    const [chemTestsInput, setChemTestsInput] = useState("")
    const [seroTests, setSeroTests] = useState([])
    const [seroTestsInput, setSeroTestsInput] = useState("")
    const [microTests, setMicroTests] = useState([])
    const [microTestsInput, setMicroTestsInput] = useState("")
 
    //FOR CHARGE SLIP
    const [totalFee, setTotalFee] = useState([])
    const [chemFee, setChemFee] = useState([])
    const [seroFee, setSeroFee] = useState([])
    const [cmFee, setCmFee] = useState([])
    const [hemaFee, setHemaFee] = useState([])

    const [chemTotalFee, setChemTotalFee] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [hemaTotalCost, setHemaTotalCost] = useState(0);
    const [seroTotalCost, setSeroTotalCost] = useState(0);
    const [cmTotalCost, setCmTotalCost] = useState(0);

    const [isDiscounted, setIsDiscounted] = useState(true);

    let { pId } = useParams();
    let history = useHistory();

    const calculateCost = (costArray, section) => {
        let total = 0;
        let price = 0;

        for(let i=0; i < costArray.length; i++){
                total = parseInt(costArray[i]) + total
            }

        if(isDiscounted === true){
            let discount = total * 0.2
            price = total - discount
        }else{
            price = total
        }
        if(section === "total"){
            setTotalCost(price);
        }else if(section === "chem"){
            setChemTotalFee(price);
        }else if(section === "cm"){
            setCmTotalCost(price);
        }else if(section === "hema"){
            setHemaTotalCost(price)
        }else if(section === "sero"){
            setSeroTotalCost(price)
        }
    }


    useEffect(()=>{
        calculateCost(totalFee, "total");
        calculateCost(chemFee, "chem");
        calculateCost(hemaFee, "hema");
        calculateCost(seroFee, "sero");
        calculateCost(cmFee, "cm");
    },[totalFee, hemaFee, cmFee, seroFee, chemFee])
    
    useEffect( async () => {
        await axios.get(`http://${host.ip}:3001/test`).then((response) => {
            setTestData(response.data);
        })

        await axios.get(`http://${host.ip}:3001/order`).then((response) => {
            setLastOrderIdData(response.data);

        })

        await axios.get(`http://${host.ip}:3001/patient/findpatientById/${pId}`).then((response) => {
            setPtData(response.data);
            if(response.data.idenno === "" || response.data.idenno === "N/A" || response.data.idenno === "NA" || response.data.idenno === "na" || response.data.idenno === "n/a"){
                setIsDiscounted(false)
            }
            setIsLoading(false);
        })
    }, [pId])

    useEffect(() => {
            const reducedTests = tests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setLabTestInput(reducedTests);

            const reducedChemTests = chemTests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setChemTestsInput(reducedChemTests);  
            
            const reducedCmTests = cmTests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setCmTestsInput(reducedCmTests);
            
            const reducedSeroTests = seroTests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setSeroTestsInput(reducedSeroTests);
            
            const reducedHemaTests = hemaTests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setHemaTestsInput(reducedHemaTests);
            
            const reducedMicroTests = microTests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
            setMicroTestsInput(reducedMicroTests);  

    }, [tests, chemTests, cmTests, seroTests, microTests, hemaTests])



    const submitHandler = () => {
        // Reduce array for test input
        const reducedTests = tests.reduce((acc, curr) => `${acc}${curr.testcode} `, '');
        setLabTestInput(reducedTests);

        //Set Lab No 
        let year = new Date().getFullYear();
        let month = new Date().getMonth();

        const branchcode = `${host.branchcode}`;
        let id = lastOrderIdData.id+1;

        let concatLabNo = `${branchcode}-${year}-${month+1}-${id}`
        setLabNumberInput(concatLabNo);
    
    }

    const onSubmit = async (data) => {
     if(labTestInput.length === 0){
         alert("Please add test!")
     }else{

        await axios.get(`http://${host.ip}:3001/order`).then((response) => {
            setLastOrderIdData(response.data);
            //Set Lab No 
            let year = new Date().getFullYear();
            let month = new Date().getMonth();

            const branchcode = "CAM";
            let id = lastOrderIdData.id+1;

            let concatLabNo = `${branchcode}-${year}-${month+1}-${id}`
            data.labNumber = concatLabNo;
        })

        setIsLoading(true);
        data.forPtId = ptData.id;
        data.testsRequested = labTestInput;


        // ADD COSTS HERE
        data.totalCost = totalCost;
        data.chemCost = chemTotalFee;
        data.seroCost = seroTotalCost;
        data.hemaCost = hemaTotalCost;
        data.cmCost = cmTotalCost;
        data.isDiscounted = isDiscounted

        //Check if sections are null

        await axios.post(`http://${host.ip}:3001/order/addorder`, data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(response.data.error){
                alert('You are not logged in, please log-in!');
                history.push('/login');
            }else{

                if(cmTestsInput){
                    axios.post(`http://${host.ip}:3001/order/addsord`,
                        {
                            section: "CM",
                            tests: cmTestsInput,
                            forOrderID: lastOrderIdData.id+1,
                            sectNumber: `(CM)-${labNumberInput}`
                        },
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken")
                        }
                    }).then((response) => {
                        if(response.data.error){
                            alert('You are not logged in, please log-in!');
                            history.push('/login');
                        }
                    })
                }


                if(chemTestsInput){
                    axios.post(`http://${host.ip}:3001/order/addsord`,
                    {
                        section: "Chemistry",
                        tests: chemTestsInput,
                        forOrderID: lastOrderIdData.id+1,
                        sectNumber: `(CHEM)-${labNumberInput}`
                    },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    if(response.data.error){
                        alert('You are not logged in, please log-in!');
                        history.push('/login');
                    }
                })
                }


                if(hemaTestsInput){
                    axios.post(`http://${host.ip}:3001/order/addsord`,
                    {
                        section: "Hematology",
                        tests: hemaTestsInput,
                        forOrderID: lastOrderIdData.id+1,
                        sectNumber: `(HEMA)-${labNumberInput}`
                    },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    if(response.data.error){
                        alert('You are not logged in, please log-in!');
                        history.push('/login');
                    }
                })
                }


                if(seroTestsInput){
                    axios.post(`http://${host.ip}:3001/order/addsord`,
                    {
                        section: "Serology",
                        tests: seroTestsInput,
                        forOrderID: lastOrderIdData.id+1,
                        sectNumber: `(SERO)-${labNumberInput}`
                    },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    if(response.data.error){
                        alert('You are not logged in, please log-in!');
                        history.push('/login');
                    }
                })
                }


                if(microTestsInput){
                    axios.post(`http://${host.ip}:3001/order/addsord`,
                    {
                        section: "Micro",
                        tests: microTestsInput,
                        forOrderID: lastOrderIdData.id+1,
                        sectNumber: `(MICRO)-${labNumberInput}`
                    },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    if(response.data.error){
                        alert('You are not logged in, please log-in!');
                        history.push('/login');
                    }
                })
                }


                axios.post(`http://${host.ip}:3001/order/cnxtion`,
                    {
                        OrderId: lastOrderIdData.id+1,
                        PatientlistId: ptData.id
                    },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then((response) => {
                    if(response.data.error){
                        alert('You are not logged in, please log-in!');
                        history.push('/login');
                    }
                })

                history.push('/')
            
            }
        })
     }
    }

    const showModal = () => {
        setShow(true);
    }

    const closeModal= () => {
        submitHandler();
        setShow(false);
    }


    const initialValues = {
        forPtId: ptData.branchid,
        reqDr:"",
        testsRequested:labTestInput,
        labNumber: "",
        ptType: "",
    }


    const validationSchema = Yup.object().shape({

        forPtId: Yup.string(),
        reqDr: Yup.string().required("This field is required! Put N/A if none"),
        ptType: Yup.string().required("This field is required!"),
        testsRequested: Yup.string(),
        labNumber: Yup.string(),

    })

    if(isLoading){
        return(
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }

    return (
         <div className="container">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <h3>Add Patient Order</h3>
                    <strong>Patient Information Information</strong>
                    <div className="row">
                        <div className="col-md-4">
                        <label>Patient ID:</label>
                        <input type="text" className='form-control' id="form-field" value={ptData.branchid} disabled={true} />
                    </div>
                </div>
                
                <div className="row">
                
                    <div className="col-md-4">
                        <label htmlFor="lastname">Lastname:</label> 

                        <input type="text" className='form-control' id="form-field" value={ptData.lastname} disabled />
                        
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="firstname">First name:</label>
                        
                    <input type="text" className='form-control' id="form-field" value={ptData.firstname} disabled/>
                        
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="middlename">Middle name:</label>
                        
                        <input type="text" className='form-control' id="form-field" value={ptData.middlename} disabled />
                    </div>
                </div>

                <div className="row mb-4">

                    <div className="col-md-2">
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="form-field" className='form-select' value={ptData.gender} disabled/>
                    </div>

                    <div className="col-md-2">
                        <label name="age">Age:</label>
                        
                        <input type="text" className='form-control' id="form-field" value={ptData.age} disabled/>
                        
                    </div>
                    
                </div>
                
                <strong>Request Information</strong>
                    <div className="row">
                        <div className="col-md-4">
                        <label htmlFor="reqDr">Requesting Physician:</label>
                        <Field 
                            name="reqDr"
                            id="form-field"
                            type="text"
                            placeholder="Requesting Physician"
                            autoComplete="off"
                            className='form-control'
                        />
                        <ErrorMessage name="reqDr" component="span" />

                        </div>

                        <div className="col-md-4">
                        <label htmlFor="reqDr">Patient Type:</label>
                        <Field 
                            name="ptType"
                            id="form-field"
                            type="text"
                            placeholder="OPD / Room No."
                            autoComplete="off"
                            className='form-control'
                        />
                        <ErrorMessage name="ptType" component="span" />

                        </div>

                        <div className="form-content">
                            <Field 
                                name="testsRequested"
                                id="form-field"
                                type="text"
                                placeholder="Test Requested"
                                hidden={true}
                                value={labTestInput}
                                disabled={false}
                            />
                        </div>
                        
                        <div className="form-content">
                            <Field 
                                name="labNumber"
                                id="form-field"
                                type="text"
                                placeholder="Lab No."
                                hidden={true}
                                disabled={false}
                                value={labNumberInput}
                            />
                        </div>
                        
                    </div>
                    
                    <br />
                    <div className='d-flex justify-content-center'>
                        <div className='col-md-11'>
                            <table className="table">
                            <tbody>
                                <tr className="table-success">
                                    <td><strong>Requested Test/s</strong></td>
                                    <td><strong>Regular Unit Cost</strong></td>
                                    <td><strong>Action</strong></td>
                                </tr>
                                {tests.map((test) => {
                                    return (
                                        <Testrow
                                            setTests={setTests}
                                            tests={tests}
                                            key={test.index}
                                            test={test}
                                            submitHandler={submitHandler}
                                            setLabTestInput={setLabTestInput}
                                            setHemaTests={setHemaTests}
                                            setCmTests={setCmTests}
                                            setChemTests={setChemTests}
                                            setSeroTests={setSeroTests}
                                            setMicroTests={setMicroTests}
                                            hemaTests={hemaTests}
                                            cmTests={cmTests}
                                            chemTests={chemTests}
                                            seroTests={seroTests}
                                            microTests={microTests}

                                            setTotalFee={setTotalFee}
                                            setChemFee={setChemFee}
                                            totalFee={totalFee}
                                            chemFee={chemFee}

                                            setHemaFee={setHemaFee}
                                            hemaFee={hemaFee}

                                            setSeroFee={setSeroFee}
                                            seroFee={seroFee}

                                            setCmFee={setCmFee}
                                            cmFee={cmFee}

                                            totalCost={totalCost}
                                            setTotalCost={setTotalCost}
                                        />
                                    )
                                })}
                                <tr>
                                    <td className="select" onClick={showModal}>Click here to add test</td>
                                    <td><strong>{isDiscounted === true && `Discounted`} Total: PHP {totalCost}</strong></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                    

                    <button className="btn btn-success col-md-2 mb-2" type="submit">Add order</button>

                    {/* modal  */}

                    <Addordermodal 
                        show={show}
                        setShow={setShow}
                        tests={testData}
                        close={closeModal}
                        testlist={tests}
                        setTestsList={setTests}
                        hemaTests={hemaTests}
                        setHemaTests={setHemaTests}
                        cmTests={cmTests}
                        setCmTests={setCmTests}
                        chemTests={chemTests}
                        seroTests={seroTests}
                        setSeroTests={setSeroTests}
                        microTests={microTests}
                        setMicroTests={setMicroTests}
                        setChemTests={setChemTests}

                        setTotalFee={setTotalFee}
                        setChemFee={setChemFee}
                        totalFee={totalFee}
                        chemFee={chemFee}

                        setHemaFee={setHemaFee}
                        hemaFee={hemaFee}

                        setSeroFee={setSeroFee}
                        seroFee={seroFee}

                        setCmFee={setCmFee}
                        cmFee={cmFee}

                        totalCost={totalCost}
                        setTotalCost={setTotalCost}
                    />

                </Form>
            </Formik>
                    
        </div>
    )
}

export default Addorder
