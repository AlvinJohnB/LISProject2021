import React from 'react'
import { useState } from 'react'

import './modal.css'

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

    const handleClick = (e) => {
        let testSelected = e.target.id;
        let testlist = props.testlist;

        if(testlist.length >= 1){
            for(let i = 0; i < testlist.length; i++){
                let test = testlist[i].testname;
                let key = i;
                if(test.indexOf(testSelected) > -1){
                    props.close();
                    alert("Duplicate test detected!");
                }else{
                    testlist.push({testname: testSelected});
                    props.close();
                }
             }
        }else{
            testlist.push({testname: testSelected});
            props.close();
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
                    <input autoComplete="off" id="myInput" type="text" name="searchInput" placeholder="Type testcode..." onChange={testFilter}/>
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
                                                    return <tr key={key}>
                                                        <td className="width-1">{test.testcode}</td>
                                                        <td className="width-2">{test.testname}</td>
                                                        <td className="width-1" id={test.testname} onClick={handleClick}>Select</td>
                                                    </tr>
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
