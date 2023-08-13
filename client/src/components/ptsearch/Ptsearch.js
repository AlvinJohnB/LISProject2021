import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NotLoggedInModal from '../NotLoggedInModal';
import Searchresult from './Searchresult';
import host from '../../config.json'
import { useState } from 'react'
import '../../App.css'

const Ptsearch = () => {

  const [isPatientNotFound, setIsPatientNotFound] = useState(false)
  const [patientSearchInfo, setPatientSearchInfo] = useState({})
  const [isSearchSuccess, setSearchSuccess] = useState(false)


  const initialValues ={
    lastname: "",
    firstname:""
  }

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("This field is required!"),
    firstname: Yup.string()
  })

  const onSubmit = async (data) => {

    await axios.post(`http://${host.ip}:3001/patient/findpatient`, data).then((response) => {
    
    if(response.data.length <= 0){
      setIsPatientNotFound(true);
      setSearchSuccess(false)

    } else {
      setIsPatientNotFound(false);
      setPatientSearchInfo({
        lastname: data.lastname,
        firstname: data.firstname
      })
      setSearchSuccess(true)
    }
    })


  }


  return (
    <div className="container">
      <NotLoggedInModal />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <h3>Patient Search</h3>
          {isPatientNotFound && <div className='alert alert-danger text-center p-1 mb-1'>No patient data found</div>}
          <strong>Enter Patient Information</strong>
         
            <div className="row">
              <div className='col-md-3'>
                  <label htmlFor="lastname">Lastname:</label>
                  <Field
                      autoComplete="off"
                      type="text"
                      name="lastname"
                      id="form-field"
                      className="form-control"
                      placeholder="Enter last name"
                    />
                    <ErrorMessage name="lastname" component="span"/>
              </div>

              <div className="col-md-3">
              <label className="form-content" htmlFor="firstname">First name:</label>
              <Field
                autoComplete="off"
                type="text"
                name="firstname"
                className="form-control"
                id="form-field"
                placeholder="Enter first name"
              />
            </div>
              
            </div>
            
          <button className="btn btn-success col-md-2 mt-4 mb-4" type="submit">Search Patient </button>
          
        </Form>
      </Formik>



      {isSearchSuccess && <Searchresult patient={patientSearchInfo}/>}
    </div>
  );
}

export default Ptsearch;
