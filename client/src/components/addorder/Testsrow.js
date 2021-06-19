import React from 'react'

import './modal.css'

const Testsrow = ({ testcode, testname, test, testlist, close, inputHandler }) => {

    const handleClick = () => {
        let testSelected = test;

        let key = testlist.length;

        // Check for duplicate
        let duplicate = false;
        let notDuplicate = true;

        if(testlist.length >= 1){
            for(let i = 0; i < testlist.length; i++){
                let test = testlist[i].testname;
                if(testSelected.testname === test){
                    duplicate = true;
                } else {
                    notDuplicate = true;
                }
            }
        }
        if(duplicate){
            alert("Duplicate test detected, please recheck.");
            close();
        } else if(notDuplicate){
            testlist.push({testname: testSelected.testname, testcode: testSelected.testcode, index: key});
            close();
        }
    }

    return (
        <tr className="tbcontent">
            <td className="width-1">{testcode}</td>
            <td className="width-2">{testname}</td>
            <td className="width-1" onClick={handleClick}>Select</td>
        </tr>
    )
}

export default Testsrow
