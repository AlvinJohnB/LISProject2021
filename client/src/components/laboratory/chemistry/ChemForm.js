import React from 'react'
import axios from 'axios';

import Header from '../../Header';
import LabNav from '../LabNav';
import ChemTr from './ChemTr';
import ChemResultmodal from './ChemResultmodal';
import ReactPaginate from 'react-paginate';
import NotLoggedInModal from '../../NotLoggedInModal';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import LabLoadingModal from '../../LabLoadingModal';
import host from '../../../config.json'
import background from '../../../images/background.jpg'

function ChemForm() {

    const bgStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'auto'
      }

    const [sectionData, setSectionData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [resultFormData, setResultFormData] = useState();
    const [sectionResultArray, setSectionResultArray] = useState();
    const [prevResultData, setPrevResultData] = useState();
    const [showPrevResModal, setShowPrevResModal] = useState(false);

    const initialValues = {
        labNumber: "",
    }

    const validationSchema = Yup.object().shape({
        labNumber: Yup.string().required("This field is required!"),

    })

    const onSubmit = async (data) => {
        await axios.get(`http://${host.ip}:3001/order/section/Chemistry/${data.labNumber}`).then((response) => {
            setSectionData(response.data);
            setIsLoading(false);
        })
    }

    const closeModal = () => {
        setShow(false);
    }
 
    useEffect(() => {
        axios.get(`http://${host.ip}:3001/order/section/Chemistry`).then((response) => {
            setSectionData(response.data);
            setIsLoading(false);
        })
    },[sectionResultArray])

    const [pageNumber, setPageNumber] = useState(0);
    const orderPerPage = 15;
    const pagesVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(sectionData.length / orderPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const displayOrders = sectionData.slice(pagesVisited, pagesVisited + orderPerPage).map((details) => {
        return (<ChemTr 
            details={details} 
            key={details.id}
            setShow={setShow}
            setResultFormData={setResultFormData}
            setSectionResultArray={setSectionResultArray}
            prevResultData={prevResultData}
            setPrevResultData={setPrevResultData}     
        />)
    })

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <LabLoadingModal />
            </div>
        )
    }

    return (
        <div style={bgStyle}>
        <div className="container pt-5">
        <NotLoggedInModal />
        <Header />
        <LabNav />
        <section>
            <div className="bg-light p-3">

                <h3>Clinical Chemistry</h3>


                <div className="row mb-3">
                    <div className="col-md-3">
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            <Form>
                                <label>Filter:</label>
                                <Field 
                                        name="labNumber"
                                        id="form-field"
                                        type="text"
                                        placeholder = "Enter lab no..."
                                        className="form-control"
                                />
                                <button className="btn btn-primary col-md-4" type="submit">Search</button>
                            </Form>
                        </Formik>
                    </div>                
                </div>

                                       
                <table className="table table-hover">
                    <tbody>
                        <tr className="table-primary">
                            <th>LabNumber</th>
                            <th>Client Name</th>
                            <th>Test/s</th>
                            <th>Action</th>
                        </tr>
                        {displayOrders}
                        {pageCount > 1 &&                     
                <ReactPaginate
                previousLabel = {"<"}
                nextLabel = {">"}
                pageCount = {pageCount}
                onPageChange={changePage}
                containerClassName={"orders-pagination-bttns"}
                previousLinkClassName={"orders-prevBttn"}
                nextLinkClassName={"orders-nextbtn"}
                disabledClassName={"orders-pgnte-disabled"}
                activeClassName={"orders-pgninate-active"}
            />}

                    </tbody>
                </table>

                                  

                <ChemResultmodal
                    show={show}
                    setShow={setShow}
                    closeModal={closeModal}
                    resultFormData={resultFormData}
                    sectionResultArray={sectionResultArray}
                    setSectionResultArray={setSectionResultArray}
                    setResultFormData={setResultFormData}
                    prevResultData={prevResultData}
                    setPrevResultData={setPrevResultData}
                    showPrevResModal = {showPrevResModal}
                    setShowPrevResModal = {setShowPrevResModal}
                    setSectionData={setSectionData}
                />
                    
               
            </div>      
        </section>
        <footer className="p-1 mb-5 rounded-bottom">{host.version}</footer>
    </div>
    </div>
    )
}

export default ChemForm
