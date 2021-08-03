import React from 'react'

import './modal.css'

const Testsrow = ({setTestsList, setHemaTests, setCmTests, setSeroTests, setMicroTests, testcode, testname, test, testlist, close, cmTests, microTests, hemaTests, chemTests, seroTests, setChemTests }) => {

    const handleClick = () => {
        let testSelected = test;

        // Check for duplicate
        let duplicate = false;
        let notDuplicate = true;

        let key = testlist.length;

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
            // Check what section
            let section = testSelected.section;
            if(section === "Chemistry"){
                setChemTests([...chemTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }else if(section === "Hematology"){
                setHemaTests([...hemaTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }else if(section === "CM"){
                setCmTests([...cmTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }else if(section === "Serology"){
                setSeroTests([...seroTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }else if(section === "Micro"){
                setMicroTests([...microTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }
            setTestsList([...testlist, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section, index: key} ])
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
