import React from 'react'
import axios from 'axios';
import { useHistory, } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import NotLoggedInModal from '../NotLoggedInModal';

function Results() {
    let history = useHistory();

    const initialValues = {
        labNumber: "",
    }

    const validationSchema = Yup.object().shape({

        labNumber: Yup.string().required("This field is required!"),

    })

    const onSubmit = async (data) => {
        await axios.get(`http://localhost:3001/order/getorder/${data.labNumber}`, {
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
            <div className="labwrapper">
                <NotLoggedInModal />
                <h1 className="labcontentheader-results">&nbsp; Results</h1>
                
                <div className="labdiv">
                    <div className="labdivcontent">
                        <div className="block">
                            <div>
                                <h4>Enter Laboratory Number:</h4>
                            </div>
                            <div>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className="margin-0">
                                <div className="form-content labdiv-flex-block">
                                    <Field 
                                        name="labNumber"
                                        autoComplete="off"
                                        id="form-field"
                                        type="text"
                                        placeholder="Enter lab no..."
                                        className="mr-10"
                                    />
                                    <button className="form-content form-botton margin-0" type="submit">Submit</button>
                                </div><ErrorMessage name="labNumber" component="span" /><br />
                                    
                                </Form>
                            </Formik>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default Results
