import React from 'react'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import Moment from 'moment'

function PrevResultModal({showPrevResModal, setShowPrevResModal, prevResultData}) {

    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const resultPerPage = 1;
    const pagesVisited = pageNumber * resultPerPage

    if(prevResultData == null){
        return null
    }

    const displayPrevResults = prevResultData.Orders.slice(pagesVisited, pagesVisited + resultPerPage).map((order, index) => {
        return (
            <div className="checkin-modal-body" key={index}>
            <p className="order-dits">
                <strong>Patient Name:</strong> {prevResultData.lastname}, {prevResultData.firstname} {prevResultData.middlename}<br />
                <strong>Lab Number:</strong> {order.labNumber}<br />
                <strong className="red">Date: {Moment(order.createdAt).format('MMM d, yyyy')}<br /></strong>
            </p><br />
            <table className="tablelab">
                <tbody>
                    <tr className="labheader">
                        <th>Test</th>
                        <th>Result</th>
                        <th>Unit</th>
                        <th>Reference</th>
                    </tr>
                    
                    {/* {order.Sectionorders[0].Sectionresults.map((test, index) => {
                    return(
                        <PrevTr key={index} test={test} prevResultData={prevResultData} />
                    )
                })} */}

                </tbody>
            </table>
            </div>
        )
    })

    const closePrevResModal = () => {
        setShowPrevResModal(false);
        console.log(prevResultData.Orders);
    }

    if(!showPrevResModal){
        return null
    }

    if(isLoading){
        return (
            <div className="ptregwrapper">
                <h3>Loading...</h3>
            </div>
        )
    }



    return (
        <div className="checkin-modal">
        <div className="checkin-modal-wrapper">
            <div className="checkin-modal-header">
                <div><strong>Previous Result</strong></div>
                <div className="checkin-closebtn" onClick={closePrevResModal}>X</div>
            </div>
                   {/* {displayPrevResults} */}
            <div className="checkin-modal-footer">
            </div>
        </div>
    </div>
    )
}

export default PrevResultModal
