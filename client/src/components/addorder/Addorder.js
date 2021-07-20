import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Testrow from './Testrow';
import { useParams, useHistory } from 'react-router-dom';


import Addordermodal from './Addordermodal'
import '../../components/ptregistration/ptreg.css'
import './modal.css'


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
    const [cmTests, setCmTests] = useState([])
    const [chemTests, setChemTests] = useState([])
    const [seroTests, setSeroTests] = useState([])
    const [microTests, setMicroTests] = useState([])

    let { pId } = useParams();
    let history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3001/test").then((response) => {
            setTestData(response.data);
        })

        axios.get("http://localhost:3001/order").then((response) => {
            setLastOrderIdData(response.data);

        })

        axios.get(`http://localhost:3001/patient/findpatientById/${pId}`).then((response) => {
            setPtData(response.data);
            setIsLoading(false);
        })

    }, [pId])

    useEffect(() => {

            const reducedTests = tests.reduce((acc, curr) => `${acc}${curr.testcode},`, '');
            setLabTestInput(reducedTests);

    }, [tests])

    const submitHandler = () => {
        // Reduce array for test input
        const reducedTests = tests.reduce((acc, curr) => `${acc}${curr.testcode},`, '');
        setLabTestInput(reducedTests);

        //Set Lab No 
        let year = new Date().getFullYear();
        let month = new Date().getMonth();

        const branchcode = "CAM";

        let id = lastOrderIdData.id+1;

        let concatLabNo = `${branchcode}-${year}-${month}-${id}`
        setLabNumberInput(concatLabNo);
    
    }

    const onSubmit = (data) => {

        data.testsRequested = labTestInput;
        data.labNumber = labNumberInput;

        axios.post("http://localhost:3001/order/addorder", data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(response.data.error){
                alert('You are not logged in, please log-in!');
                history.push('/login');
            }else{
                history.push('/order');
            }
        })

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
    }


    const validationSchema = Yup.object().shape({

        forPtId: Yup.string(),
        reqDr: Yup.string().required("This field is required! Put N/A if none"),
        testsRequested: Yup.string(),
        labNumber: Yup.string(),

    })

    if(isLoading){
        return(
            <div className="ptregwrapper">
            <h3>Loading...</h3>
            </div>
        )
    }

    return (
         <div className="ptregwrapper">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <h1>Add Patient Order</h1>
                    <hr />
                    <h4>Patient Information Information</h4>
                    <div className="form-group">
                        <div className="form-content">
                        <label htmlFor="forPtId" className="form-content">Patient ID:</label>
                    <Field 
                            name="forPtId"
                            id="form-field"
                            type="text"
                            disabled={true}
                    />
                    </div>
                </div>
                
                <div className="form-group">
                
                    <div className="form-content">
                        <label className="form-content" htmlFor="lastname">Lastname:</label> 

                        <input type="text" id="form-field" value={ptData.lastname} disabled />
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="firstname">First name:</label>
                        
                    <input type="text" id="form-field" value={ptData.firstname} disabled/>
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="middlename">Middle name:</label>
                        
                        <input type="text" id="form-field" value={ptData.middlename} disabled />
                    </div>
                </div>

                <div className="form-group">

                    <div className="form-content">
                        <label className="form-content" htmlFor="gender">Gender:</label>
                        <input type="text" id="form-field" value={ptData.gender} disabled/>
                    </div>

                    <div className="form-content">
                        <label className="form-content" name="age">Age:</label>
                        
                        <input type="text" id="form-field" value={ptData.age} disabled/>
                        
                    </div>
                    
                </div>
                
                <br /><h4>Request Information</h4>
                    <div className="form-group">

                        <div className="form-content addressdiv">
                        <label className="form-content" htmlFor="address">Requesting Physician:</label>
                        <Field 
                            name="reqDr"
                            id="form-field"
                            type="text"
                            placeholder="Requesting Physician"
                            autoComplete="off"
                        />
                        <ErrorMessage name="reqDr" component="span" />
                        </div>
                        <div className="form-content">
                            <Field 
                                name="testsRequested"
                                id="form-field"
                                type="text"
                                placeholder="Test Requested"
                                hidden={false}
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
                                hidden={false}
                                disabled={false}
                                value={labNumberInput}
                            />
                        </div>
                        
                    </div><br />
                    <table className="table width50">
                        <tbody>
                            <tr className="header">
                                <td>Requested Test/s</td>
                                <td>Action</td>
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
                                    />
                                )
                            })}
                            <tr>
                                <td className="select" onClick={showModal}>Click here to add test</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="form-content form-botton" type="submit">Submit</button>
                    <Addordermodal 
                        show={show}
                        tests={testData}
                        close={closeModal}
                        testlist={tests}
                        hemaTests={hemaTests}
                        cmTests={cmTests}
                        chemTests={chemTests}
                        seroTests={seroTests}
                        microTests={microTests}
                    />

                </Form>
            </Formik>
                    
        </div>
    )
}

export default Addorder
