import React from 'react'


import './modal.css'
import Testsrow from './Testsrow';

const Addordermodal = (props) => {


    if(!props.show){
        return null
    }

    const testFilter = (e) => {
        const table = document.querySelector("#teststable");
        const tr = table.getElementsByTagName("tr");
        let filter = e.target.value.toUpperCase();
        

        if(tr){
            for(let i = 0; i < tr.length; i++){
                let td = tr[i].getElementsByTagName("td")[0]
                if(td){
                    let test = td.innerHTML || td.innerText
                    if(test.indexOf(filter) > -1){
                        tr[i].style.display = "";
                    }else{
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    return (
        <div className ="modal">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <div><strong>Search Tests:</strong>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="tablewrapper">
                    <input className="form-input" autoFocus={true} autoComplete="off" id="myInput" type="text" name="searchInput" placeholder="Type testcode..." onChange={testFilter}/>
                        <table className="testtable">
                        <tbody>
                            <tr className="tableheader">
                                <td className="width-1">Test code</td>
                                <td className="width-2">Test name</td>
                                <td className="width-1">Action</td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <div className="tablebody">
                                        <table id="teststable" className="tablecontent">
                                            <tbody>
                                                {props.tests.map((test, key) => {
                                                    return (
                                                        <Testsrow 
                                                            key={key} 
                                                            testcode={test.testcode} 
                                                            testlist={props.testlist} 
                                                            setTestsList={props.setTestsList}
                                                            testname={test.testname} 
                                                            test={test} 
                                                            close={props.close} 
                                                            hemaTests={props.hemaTests}
                                                            setHemaTests={props.setHemaTests}
                                                            cmTests={props.cmTests}
                                                            setCmTests={props.setCmTests}
                                                            chemTests={props.chemTests}
                                                            seroTests={props.seroTests}
                                                            setSeroTests={props.setSeroTests}
                                                            microTests={props.microTests}
                                                            setMicroTests={props.setMicroTests}
                                                            setChemTests={props.setChemTests}

                                                            setTotalFee={props.setTotalFee}
                                                            setChemFee={props.setChemFee}
                                                            totalFee={props.totalFee}
                                                            chemFee={props.chemFee}

                                                            setSeroFee={props.setSeroFee}
                                                            seroFee={props.seroFee}

                                                            setCmFee={props.setCmFee}
                                                            cmFee={props.cmFee}

                                                            setHemaFee={props.setHemaFee}
                                                            hemaFee={props.hemaFee}

                                                            totalCost={props.totalCost}
                                                            setTotalCost={props.setTotalCost}

                                                            
                                                        />
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <input className="closeButton" type="button" value="Close" onClick={props.close} />
                </div>
            </div>
        </div>
    )
}

export default Addordermodal
