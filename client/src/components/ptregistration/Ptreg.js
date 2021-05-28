import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import './ptreg.css';

const Ptreg = () => {
  return (
    <div className="ptregwrapper">
            <Formik>

                <Form>
                <h1>Patient Registration</h1>
                <hr />
                <h4>Personal Information</h4>
                <div className="form-group">
                    <div className="form-content">
                        <label className="form-content" htmlFor="lastname">Lastname:</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="lastname"
                            placeholder="Lastname"
                        />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="firstname">First name:</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="firstname"
                            placeholder="First name"
                        />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="middlename">Middle name:</label>
                        <Field 
                            autoComplete="off"
                            id="form-field"
                            name="middlename"
                            placeholder="Middle name"
                        />
                    </div>
                </div>

                <div className="form-group">

                    <div className="form-content">
                        <label className="form-content" htmlFor="gender">Gender:</label>
                        <Field id="form-field" as="select" name="gender">
                            <option  value="invalid">Select gender</option>
                            <option  value="Male">Male</option>
                            <option  value="Female">Female</option>
                        </Field>
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="bday">Birthdate:</label>
                        <Field id="form-field" type="date" name="bday" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="age">Age:</label>
                        <Field id="form-field" type="number" name="age" autoComplete="off" />
                    </div>
                </div>
                <br /><h4>Contact and other information</h4>
                    <div className="form-group">

                        <div className="form-content addressdiv">
                        <label className="form-content" htmlFor="address">Address:</label>
                        <Field 
                            name="address"
                            autoComplete="off"
                            id="form-field"
                            type="text"
                            placeholder="Address"
                        />
                        </div>
                        <div className="form-content">
                            <label className="form-content" htmlFor="phone">Phone Number:</label>
                            <Field 
                                id="form-field"
                                autoComplete="off"
                                name="phone"
                                type="number"
                                placeholder="Phone number"
                            />
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <div className="form-content">
                        <label className="form-content" htmlFor="identi">Identification Card No. (SC, PWD, etc.)</label>
                        <Field
                            name="idenno"
                            type="text"
                            id="form-field"
                            autoComplete="off"
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
