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
        <div className="container">
            <h3> Orders</h3>
            <div className='row'>
                <div className='col-md-3 mb-5'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            <Form>
                                <label>Search lab number:</label>
                                <div className='d-flex'>
                                    <Field 
                                            name="labNumber"
                                            id="form-field"
                                            type="text"
                                            placeholder = "Enter lab no..."
                                            className="form-control col-md-3"
                                    />
                                    <button className="btn btn-success my-auto mx-1" type="submit">Search</button>
                                </div>
                            </Form> 
                    </Formik>
                </div>
            </div>
                    <table className="table table-hover">
                        <tbody className="table-orders">
                            <tr className="table-secondary">
                                <th className="text-center">Lab Number</th>
                                <th className="text-center">Patient Name</th>
                                <th className="text-center">Test/s Requested</th>
                                <th className="text-center">Progress</th>
                                <th className="text-center">Date Encoded</th>
                                <th className="text-center">Action</th>
                            </tr>

                           {displayOrders}
                        </tbody>
                    </table>
                    <br />
                    {pageCount > 1 &&                     
                        <ReactPaginate
                        previousLabel = {"Prev"}
                        nextLabel = {"Next"}
                        pageCount = {pageCount}
                        onPageChange={changePage}
                        containerClassName={"orders-pagination-bttns"}
                        previousLinkClassName={"orders-prevBttn"}
                        nextLinkClassName={"orders-nextbtn"}
                        disabledClassName={"orders-pgnte-disabled"}
                        activeClassName={"orders-pgninate-active"}
                    />}

                

            
            <NotLoggedInModal /> 
        </div>
    )
}

export default Orders
