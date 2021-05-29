import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory, } from 'react-router-dom';

import '../ptregistration/ptreg.css';

const Noptrecord = () => {

  const history = useHistory();
  const initialValues ={
    lastname: "",
    firstname:""
  }

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("This field is required!"),
    firstname: Yup.string()
  })

  const onSubmit = (data) => {

    axios.post('http://localhost:3001/patient/findpatient', data).then((response) => {
    console.log(response.data.length);
    if(response.data.length <= 0){
      console.log("No patient found");
      history.push('/noptfound');

    } else {
      let lname = data.lastname
      let fname = data.firstname
      history.push(`/searchresults/${lname},${fname}`)
    }
    })

  }
  return (
    <div className="ptregwrapper">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <h1>Patient Search</h1>
          <hr />
          <p className="error">No patient record found.</p>
          <h4>Enter Patient Information:</h4>
          <div className="form-group">
            <div className="form-content">
              <label className="form-content" htmlFor="lastname">Lastname:</label>
              <Field
                type="text"
                name="lastname"
                id="form-field"
                placeholder="Enter last name"
              />
              <ErrorMessage name="lastname" component="span"/>
            </div>

            <div className="form-content">
              <label className="form-content" htmlFor="firstname">First name:</label>
              <Field
                type="text"
                name="firstname"
                id="form-field"
                placeholder="Enter first name"
              />
            </div>
          </div>
          <button className="form-content form-botton" type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Noptrecord;
