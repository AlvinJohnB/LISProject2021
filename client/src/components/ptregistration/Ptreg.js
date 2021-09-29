import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NotLoggedInModal from '../NotLoggedInModal';

import './ptreg.css';
import LoadingModal from '../LoadingModal';

const Ptreg = () => {
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [patientLastId, setPatientLastId] = useState(0);
    const [patientAge, setPatientAge] = useState(0);

    useEffect( () => {
      axios.get("http://localhost:3001/patient").then((response) => {
        setPatientLastId(response.data)
      });
    }, []);

    if(isLoading === true){
        return (
            <LoadingModal />
        )
    }
    
    const branch = "CAMILLUS-";
    let ptId = `${branch}${patientLastId.id+1}`;

    let getAge = (e) => {

        var birthday = e.target.value;
        var bdayArray = birthday.split("-");


        var year = new Date().getFullYear();
        var month = new Date().getMonth()+1;
        var day = new Date().getDate();

        var agey = year - bdayArray[0];
        var agem = month - bdayArray[1];
        var aged = day - bdayArray[2];

        if(agem < 0){
            agey = agey -1
            agem = agem + 12
        }

        if(aged<0){
            agem = agem-1
            aged = aged+31
        }
        setPatientAge(agey);
        initialValues.age = agey;
        initialValues.branchid = ptId;
    }

    
    const initialValues = {
        branchid: ptId,
        lastname: "",
        firstname: "",
        middlename: "",
        gender:"",
        bday: "",
        age: patientAge,
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

    const onSubmit = async (data) => {
        setIsLoading(true);
        await axios.get("http://localhost:3001/patient").then((response) => {
            setPatientLastId(response.data)
            const branch = "CAMILLUS-";
            data.branchid = `${branch}${response.data.id+1}`;
          });

        data.age = patientAge;

        axios.post("http://localhost:3001/patient/addpatient", data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }else{
                history.push(`/addorder/for${ptId}`);
            }
        })
    }
    return (
    <div className="ptregwrapper">
        <NotLoggedInModal />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>

                <h1>Patient Registration</h1>
                <hr />
                <h4>Personal Information</h4>
                <div className="form-group">
                    <div className="form-content">
                       <label htmlFor="branchid" className="form-content">Patient ID:</label>
                       <ErrorMessage name="branchid" component="span" /> 
                       <Field 
                            name="branchid"
                            id="form-field"
                            type="text"
                            value={ptId}
                            disabled={true}
                       />
                    </div>
                </div>
                <div className="form-group">
                
                    <div className="form-content">
                        <label className="form-content" htmlFor="lastname">Lastname:</label> 
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="lastname"
                            placeholder="Lastname"
                        /><br />
                        <ErrorMessage name="lastname" component="span" />
                        
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="firstname">First name:</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="firstname"
                            placeholder="First name"
                        /><br />
                        <ErrorMessage name="firstname" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="middlename">Middle name:</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="middlename"
                            placeholder="Middle name"
                        /><br />
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
                        autoComplete="off"
                        id="form-field"
                        type="date"
                        onBlur={getAge}
                        name="bday" /><br />
                        <ErrorMessage name="bday" component="span" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" name="age">Age:</label>
                        <Field id="form-field" name="age" type="number" value={patientAge} disabled={true}/>
                    </div>
                </div>
                <br /><h4>Contact and other information</h4>
                    <div className="form-group">

                        <div className="form-content addressdiv">
                        <label className="form-content" htmlFor="address">Address:</label>
                        <Field 
                            autoComplete="off"
                            name="address"
                            id="form-field"
                            type="text"
                            placeholder="Address"
                        /><br />
                         <ErrorMessage name="address" component="span" />
                        </div>
                        <div className="form-content">
                            <label className="form-content" htmlFor="phone">Phone Number:</label>
                            <Field 
                                autoComplete="off"
                                id="form-field"
                                name="phone"
                                type="tel"
                                placeholder="Phone number"
                            /><br />
                             <ErrorMessage name="phone" component="span" />
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <div className="form-content">
                        <label className="form-content" htmlFor="idenno">Identification Card No. (SC, PWD, etc.)</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="idenno"
                            placeholder="ID Number"
                        />
                        </div>
                    </div>

                    <button className="form-content form-botton" type="submit">Submit</button>

                </Form>
            </Formik>
    </div>
  );
}

export default Ptreg;
