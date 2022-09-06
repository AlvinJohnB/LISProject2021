import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import host from '../../config.json'
import '../../components/ptregistration/ptreg.css'
import LoadingModal from '../LoadingModal';

const Updatept = () => {

    const [updatePtData, setUpdatePtData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [hasPrev, setHasPrev] = useState(false);
    const history = useHistory();

    let { pId } = useParams();
    
    useEffect(async () => {

    await axios.get(`http://${host.ip}:3001/patient/findpatientById/${pId}`).then((response) => {
        setUpdatePtData(response.data);
        setIsLoading(false);
    })

    await axios.get(`http://${host.ip}:3001/order/trx/prev/${pId}`).then((response) => {
        if(response.data.length < 1){
            setHasPrev(false);
        }else{
            setHasPrev(true);
        }    
    })

    },[pId])
    
    const initialValues = {
        branchid: updatePtData.branchid,
        lastname: updatePtData.lastname,
        firstname: updatePtData.firstname,
        middlename: updatePtData.middlename,
        gender:updatePtData.gender,
        bday: updatePtData.bday,
        age: updatePtData.age,
        phone: updatePtData.phone,
        address:updatePtData.address,
        idenno:updatePtData.idenno
    }

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
        setUpdatePtData({age: agey});

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

    const onPrevTrans = () => {
        history.push(`/porders/${pId}`)
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        data.age = initialValues.age;
        await axios.post(`http://${host.ip}:3001/patient/updatept`, data,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in, please log-in!");
                history.push("/login");
            }else{
                history.push(`/addorder/for${pId}`);
            }
        })
    }
   

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }
    return (
        <div className="ptregwrapper">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>

            <h1>Update Patient Information</h1>
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
                        value={initialValues.branchid}
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
                    />
                    <ErrorMessage name="lastname" component="span" />
                    
                </div>

                <div className="form-content">
                    <label className="form-content" htmlFor="firstname">First name:</label>
                    <Field 
                        autoComplete="off"
                        id="form-field"
                        name="firstname"
                        placeholder="First name"
                    />
                    <ErrorMessage name="firstname" component="span" />
                </div>

                <div className="form-content">
                    <label className="form-content" htmlFor="middlename">Middle name:</label>
                    <Field 
                        autoComplete="off"
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
                    onBlur={getAge}
                    name="bday" />
                    <ErrorMessage name="bday" component="span" />
                </div>

                <div className="form-content">
                    <label className="form-content" name="age">Age:</label>
                    <Field id="form-field" name="age" type="number" value={updatePtData.age} disabled={true} />
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
                    />
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
                        />
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

                <div className="form-group">
                    <button className="form-content form-botton widthauto" type="submit">Update / Proceed</button>
                    {hasPrev === true && <button className="form-content form-botton widthauto filter" onClick={onPrevTrans} type="button">Show Previous Transactions</button>}
                </div>
                

            </Form>
        </Formik>

        </div>
    )
}

export default Updatept
