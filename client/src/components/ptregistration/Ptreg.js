import React from 'react';

import './ptreg.css';

const Ptreg = () => {
  return (
    <div className="ptregwrapper">
            <form autoComplete="false">
                
            <h1>Patient Registration</h1>
            <hr />
            <h4>Personal Information</h4>


            <div className="form-group">

                <div className="form-content">
                    <label className="form-content" htmlFor="lastname">Lastname:</label>
                    <input className="form-content" type="text" name="lastname" placeholder="Lastname" />
                </div>

                <div className="form-content">
                    <label className="form-content" htmlFor="firstname">First name:</label>
                    <input className="form-content" type="text" name="firstname" placeholder="First name" />
                </div>

                
                <div className="form-content">
                    <label className="form-content" htmlFor="midlename">Middle name:</label>
                    <input className="form-content" type="text" name="middlename" placeholder="Middlename" />
                </div>
            </div>

            <div className="form-group">

                <div className="form-content">
                    <label className="form-content" htmlFor="gender">Gender:</label>
                    <select>
                    <option className="form-content" value="invalid">Select gender</option>
                        <option className="form-content" value="Male">Male</option>
                        <option className="form-content" value="Female">Female</option>
                    </select>
                </div>

                <div className="form-content">
                    <label className="form-content" htmlFor="bday">Birthdate:</label>
                    <input className="form-content" type="date" name="bday" />
                </div>


                <div className="form-content">
                    <label className="form-content" htmlFor="age">Age:</label>
                    <input className="form-content" type="number" name="age" disabled/>
                </div>
                </div>

                <br /><h4>Contact and other information</h4>
                <div className="form-group">
                        
                    <div className="form-content">
                        <label className="form-content" htmlFor="address">Address:</label>
                        <input className="form-content" type="text" name="address" placeholder="Address" />
                    </div>

                    <div className="form-content">
                        <label className="form-content" htmlFor="phone">Phone Number:</label>
                        <input className="form-content" type="tel" name="phone" placeholder="Phone number" />
                    </div>
                </div>


                <div className="form-group">    
                    <div className="form-content">
                            <label className="form-content" htmlFor="identi">Identification Card No. (SC, PWD, etc.)</label>
                            <input className="form-content" type="text" name="identi" placeholder="ID No." />
                    </div>
                </div>

                <input className="form-content form-botton" type="button" value="Submit" />
            

        </form>
    </div>
  );
}

export default Ptreg;
