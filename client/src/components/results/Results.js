import React from 'react'
import axios from 'axios';
import { useHistory, } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import NotLoggedInModal from '../NotLoggedInModal';
import host from '../../config.json'
function Results() {
    let history = useHistory();

    const initialValues = {
        labNumber: "",
    }

    const validationSchema = Yup.object().shape({

        labNumber: Yup.string().required("This field is required!"),

    })

    const onSubmit = async (data) => {
        await axios.get(`http://${host.ip}:3001/order/getorder/${data.labNumber}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }
            if(response.data.length > 0){
                history.push(`/order/${response.data[0].labNumber}`);
            }else{
                alert("No orders found in that lab number!")
            }
        })
    }
 
    return (
            <div className="container">
                <NotLoggedInModal />
                <h3>Results</h3>
                
                            
                <strong>Enter Laboratory Number:</strong>
                            

                <div className='row'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className="margin-0">
                        <div className="col-md-3 d-flex">
                            <Field 
                                name="labNumber"
                                autoComplete="off"
                                id="form-field"
                                type="text"
                                placeholder="Enter lab no..."
                                className="col-md-4 form-control"
                            />
                            <button className="btn btn-success my-auto mx-2 col-md-3" type="submit">Submit</button>
                        </div><ErrorMessage name="labNumber" component="span" /><br />
                        </Form>
                    </Formik>
                </div>
                        

                    
                
            </div>
    )
}

export default Results
