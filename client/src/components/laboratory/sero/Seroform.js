import React from 'react'
import axios from 'axios';

import Header from '../../Header';
import LabNav from '../LabNav';
import ChemTr from '../chemistry/ChemTr';
import ChemResultmodal from '../chemistry/ChemResultmodal';
import ReactPaginate from 'react-paginate';
import NotLoggedInModal from '../../NotLoggedInModal';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import LabLoadingModal from '../../LabLoadingModal';


function Cmform() {

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
        await axios.get(`http://localhost:3001/order/section/Serology/${data.labNumber}`).then((response) => {
            setSectionData(response.data);
            setIsLoading(false);
        })
    }

    const closeModal = () => {
        setShow(false);
    }
 
    useEffect(() => {
        axios.get(`http://localhost:3001/order/section/Serology`).then((response) => {
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
        <div className="wrapper">
        <NotLoggedInModal />
        <Header />
        <LabNav />
          <section>
          <div className="ptregwrapper">
            <div className="labwrapper">
                <h1 className="labcontentheader-sero">&nbsp; Serology</h1>
                
                <div className="labdiv">
                    <div className="labdivcontent">
                        <div className="labdiv-flex-block">

                        <div className="form-content">
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form  className="margin-0">
                                    <label className = "filter-label">Filter:</label>
                                    <Field 
                                            name="labNumber"
                                            id="form-field"
                                            type="text"
                                            placeholder = "Enter lab no..."
                                    />
                                    <button className="form-botton filter" type="submit">Search</button>
                                </Form>
                            </Formik>
                        </div>
                            
                        </div>

                        <br /> 
                        <table className="tablelab">
                            <tbody>
                                <tr className="labheader">
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

                    </div>

                    <ChemResultmodal
                        show={show}
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
            </div>
              
         </div>
         </section>
          <footer>Laboratory Information System by Bregs</footer>
    </div>
    )
}

export default Cmform
