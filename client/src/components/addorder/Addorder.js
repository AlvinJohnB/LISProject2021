import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import axios from 'axios';

import Addordermodal from './Addordermodal'
import '../../components/ptregistration/ptreg.css'


const Addorder = () => {

    const [testData, setTestData] = useState([])
    const [show, setShow] = useState(false)
    
    const [tests] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/test").then((response) => {
            setTestData(response.data);
            console.log(response.data)
        })
    }, [])


    const showModal = () => {
        setShow(true);
    }

    const closeModal= () => {
        setShow(false);
    }


    const initialValues = {
        branchid: "",
        lastname: "",
        firstname: "",
        middlename: "",
        gender:"",
        bday: "",
        age: "",
        phone: "",
        address:"",
        idenno:""
    }

    const validationSchema = Yup.object().shape({

        branchid: Yup.string(),
        lastname: Yup.string().required("This field is required!"),
        firstname: Yup.string().required("This field is required!"),
        middlename: Yup.string(),
        bday: Yup.string().required("This field is required!"),
        age: Yup.number().required(),
        gender: Yup.string().required("This field is required!"),
        phone: Yup.string().required("This field is required!"),
        address: Yup.string().required("This field is required!"),
        idenno: Yup.string("This field is required!"),

    })

    return (
         <div className="ptregwrapper">
            <Formik initialValues={initialValues} validationSchema={validationSchema}>
                <Form>
                    <h1>Add Patient Ordder</h1>
                    <hr />
                    <h4>Patient Information Information</h4>
                    <div className="form-group">
                        <div className="form-content">
                        <label htmlFor="branchid" className="form-content">Patient ID:</label>
                        <ErrorMessage name="branchid" component="span" /> 

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
                        <Field 
                            id="form-field"
                            name="lastname"
                            placeholder="Lastname"
                        />
                        <ErrorMessage name="lastname" component="span" />
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="firstname">First name:</label>
                        <Field 
                            id="form-field"
                            name="firstname"
                            placeholder="First name"
                        />
                        <ErrorMessage name="firstname" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="middlename">Middle name:</label>
                        <Field 
                            id="form-field"
                            name="middlename"
                            placeholder="Middle name"
                        />
                        <ErrorMessage name="middlename" component="span" />
                    </div>
                </div>

                <div className="form-group">

                    <div className="form-content">
                        <label className="form-content" htmlFor="gender">Gender:</label>
                        <Field id="form-field" as="select" name="gender">
                            <option  value="invalid">Select gender</option>
                            <option  value="Male">Male</option>
                            <option  value="Female">Female</option>
                        </Field><br />
                        <ErrorMessage name="gender" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="bday">Birthdate:</label>
                        <Field 
                        id="form-field"
                        type="date"
                        name="bday" />
                        <ErrorMessage name="bday" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" name="age">Age:</label>
                        <Field id="form-field" name="age" type="number" disabled={true}/>
                    </div>
                </div>
                <br /><h4>Request Information</h4>
                    <div className="form-group">

                        <div className="form-content addressdiv">
                        <label className="form-content" htmlFor="address">Requesting Physician:</label>
                        <Field 
                            name="address"
                            id="form-field"
                            type="text"
                            placeholder="Requesting Physician"
                        />
                        <ErrorMessage name="address" component="span" />
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
                                    <tr key={test.key}>
                                        <td>{test.testname}</td>
                                        <td>Remove</td>
                                    </tr>
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
