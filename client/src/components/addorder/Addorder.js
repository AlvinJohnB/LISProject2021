import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Testrow from './Testrow';
import { useParams } from 'react-router-dom';


import Addordermodal from './Addordermodal'
import '../../components/ptregistration/ptreg.css'


const Addorder = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [testData, setTestData] = useState([])
    const [show, setShow] = useState(false)
    const [tests, setTests] = useState([])
    const [labTestInput, setLabTestInput] = useState("")
    const [ptData, setPtData] = useState({})

    let { pId } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3001/test").then((response) => {
            setTestData(response.data);
        })

        axios.get(`http://localhost:3001/patient/findpatientById/${pId}`).then((response) => {
            setPtData(response.data);
            setIsLoading(false);
        })

    }, [pId])

    const submitHandler = () => {
        // Reduce array for test input
        const reducedTests = tests.reduce((acc, curr) => `${acc}${curr.testcode},`, '');
        setLabTestInput(reducedTests);
        console.log(reducedTests);
    }

    const onSubmit = (data) => {
        data.testsRequested = labTestInput;
        console.log(data);

    }

    const showModal = () => {
        setShow(true);
    }

    const closeModal= () => {
        submitHandler();
        setShow(false);
    }


    const initialValues = {
        branchid: ptData.branchid,
        reqDr:"",
        testsRequested:labTestInput
        labNumber: "",
    }


    const validationSchema = Yup.object().shape({

        branchid: Yup.string(),
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
                        <label htmlFor="branchid" className="form-content">Patient ID:</label>
                    <Field 
                            name="branchid"
                            id="form-field"
                            type="text"
                            disabled={true}
                    />
                    </div>
                </div>
                
                <div className="form-group">
                
                    <div className="form-content">
                        <label className="form-content" htmlFor="lastname">Lastname:</label> 

                        <input type="text" id="form-field" value={ptData.lastname} />
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="firstname">First name:</label>
                        
                    <input type="text" id="form-field" value={ptData.firstname} />
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="middlename">Middle name:</label>
                        
                        <input type="text" id="form-field" value={ptData.middlename} />
                    </div>
                </div>

                <div className="form-group">

                    <div className="form-content">
                        <label className="form-content" htmlFor="gender">Gender:</label>
                        <Field id="form-field" as="select" name="gender" disabled={true}>
                            <option  value="invalid">Select gender</option>
                            <option  value="Male">Male</option>
                            <option  value="Female">Female</option>
                        </Field><br />
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" name="age">Age:</label>
                        
                        <input type="text" id="form-field" value={ptData.age/>
                        
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
                                    <Testrow setTests={setTests} tests={tests} key={test.index} test={test} submitHandler={submitHandler} />
                                )
                            })}
                            <tr>
                                <td onClick={showModal}>Click here to add test</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="form-content form-botton" type="submit">Submit</button>
                    <Addordermodal show={show} tests={testData} close={closeModal} testlist={tests}/>

                </Form>
            </Formik>
                    
        </div>
    )
}

export default Addorder
