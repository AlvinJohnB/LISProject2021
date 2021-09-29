import React from 'react'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import Moment from 'moment'
import PrevTr from './PrevTr'

function PrevResultModal({showPrevResModal, setShowPrevResModal, prevResultData}) {

    const [pageNumber, setPageNumber] = useState(0);
    const resultPerPage = 1;
    const pagesVisited = pageNumber * resultPerPage
    const pageCount = Math.ceil(prevResultData.length / resultPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    const displayPrevResults = prevResultData.slice(pagesVisited, pagesVisited + resultPerPage).map((order, index) => {
        return (
            <div className="checkin-modal-body" key={index}>
            <div className="order-dits">
                <strong>Patient Name:</strong> {order.Patientlists[0].lastname}, {order.Patientlists[0].firstname} {order.Patientlists[0].middlename}<br />
                <strong>Lab Number:</strong> {order.labNumber}<br />
                <strong className="red">Release Date: {Moment(order.createdAt).format('MMMM DD, yyyy h:MM:ss a')}<br /></strong>
            <br /></div>

            <table className="tablelab">
                <tbody>
                    <tr className="labheader">
                        <th>Test</th>
                        <th>Result</th>
                        <th>Unit</th>
                        <th>Reference</th>
                    </tr>

                    {order.Sectionorders[0].Sectionresults.map((test, index) => {
                    return(
                        <PrevTr key={index} test={test} prevResultData={order} />
                    )
                })}

                </tbody>
            </table>
            </div>
        )
    })

    const closePrevResModal = () => {
        setShowPrevResModal(false);
        console.log(prevResultData.length);
    }

    if(!showPrevResModal){
        return null
    }

    return (
        <div className="checkin-modal">
        <div className="checkin-modal-wrapper">
            <div className="checkin-modal-header">
                <div><strong>Previous Result Module:</strong></div>
                <div className="checkin-closebtn" onClick={closePrevResModal}>X</div>
            </div>
                {displayPrevResults}
            <div className="checkin-modal-footer">
            {pageCount > 1 &&
                        <ReactPaginate
                        previousLabel = {"<"}
                        nextLabel = {">"}
                        pageCount = {pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination-bttns"}
                        previousLinkClassName={"prevBttn"}
                        nextLinkClassName={"nextbtn"}
                        disabledClassName={"pgnte-disabled"}
                        activeClassName={"pgninate-active"}
                    />
            }
            </div>
        </div>
    </div>
    )
}

export default PrevResultModal
