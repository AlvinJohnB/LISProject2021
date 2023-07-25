import React from 'react'


import Header from '../../Header';
import LabNav from '../LabNav';


function ChemForm() {
    return (
        <div className="wrapper">
        <Header />
        <LabNav />
          <section>
          <div className="ptregwrapper">
            <div className="labwrapper">
                <h1 className="labcontentheader">&nbsp; Clinical Chemistry</h1>
                
                <div className="labdiv">
                    <div className="labdivcontent">
                        <div className="labdiv-flex-block">

                            <div className="mr-10">
                                <label>Filter:</label><br />
                                <input type="text" placeholder="Enter lab no..." />
                            </div>

                            <div className="mr-10">
                                <input className="btn filter" type="button" value="Filter" />
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

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
              
         </div>
         </section>
          <footer>Laboratory Information System by Bregs</footer>
    </div>
    )
}

export default ChemForm
