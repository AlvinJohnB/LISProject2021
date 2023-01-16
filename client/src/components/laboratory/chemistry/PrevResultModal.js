import React from 'react'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import Moment from 'moment'
import PrevTr from './PrevTr'

import Modal from 'react-bootstrap/Modal'

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
    }

    if(!showPrevResModal){
        return null
    }

    return (
        <Modal
        show={showPrevResModal}
        onHide={closePrevResModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header className="bg-primary" closeButton>
          <Modal.Title className="text-white">Previous Result Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {displayPrevResults}
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    )
}

export default PrevResultModal
