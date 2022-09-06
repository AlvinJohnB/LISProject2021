import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import NotLoggedInModal from '../NotLoggedInModal'
import Ordersrow from './Ordersrow'
import ReactPaginate from 'react-paginate'
import '../../components/ptregistration/ptreg.css'
import LoadingModal from '../LoadingModal'
import { useState } from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import host from '../../config.json'

function Orders() {

    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

    const initialValues = {
        labNumber: "",
    }

    const validationSchema = Yup.object().shape({
        labNumber: Yup.string().required("This field is required!"),

    })

    const [pageNumber, setPageNumber] = useState(0);
    const orderPerPage = 10;
    const pagesVisited = pageNumber * orderPerPage
    const pageCount = Math.ceil(orders.length / orderPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const displayOrders = orders.slice(pagesVisited, pagesVisited + orderPerPage).map((order) => {
        return (<Ordersrow key={order.id} order={order} />)
    })


    useEffect(async () => {
        await axios.get(`http://${host.ip}:3001/order/getorders`).then((response) => {
            setOrders(response.data);
            setIsLoading(false);
        })
    },[])

    const onSubmit = async (data) => {
        setIsLoading(true)

        await axios.post(`http://${host.ip}:3001/order/filter`, data).then((response) => {
            if(response.data.length === 0){
                alert('Lab number not found!')
                setIsLoading(false);
            }

            if(response.data[0].status === "DELETED"){
                alert("That lab number is deleted!")
            }else{
                setOrders(response.data);
            }
            setIsLoading(false);
        })
    }


    if(isLoading){
        return(
            <div className="ptregwrapper">
                <LoadingModal />
            </div>
        )
    }

    return (
        <div className="labwrapper">
            <h1 className="labcontentheader-results">&nbsp; Orders</h1>
            <div className="labdiv">
                <div className="labdivcontent">
                <div className="form-content">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form  className="margin-0">
                            <label className="form-content filter-label">Search lab number:</label>
                            <Field 
                                    name="labNumber"
                                    id="form-field"
                                    type="text"
                                    placeholder = "Enter lab no..."
                                    className="margin-0"
                            />
                            <button className="form-botton" type="submit">Search</button>
                        </Form> 
                    </Formik>
                </div>
                <br />

                    <table className="tablelab" id="ordertable">
                        <tbody className="table-orders">
                            <tr className="header">
                                <th>Lab Number</th>
                                <th>Patient Name</th>
                                <th>Test/s Requested</th>
                                <th>Date Encoded</th>
                                <th>Action</th>
                            </tr>

                           {displayOrders}
                        </tbody>
                    </table>
                    <br />
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

                </div>

            </div>
            <NotLoggedInModal /> 
        </div>
    )
}

export default Orders
