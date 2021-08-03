import React from 'react'

import './modal.css'
const Testrow = ({setTests, test, tests, setCmTests, cmTests, chemTests, setChemTests, hemaTests, setHemaTests, seroTests, setSeroTests, microTests, setMicroTests}) => {

    const removeHandler = () => {
        
        
        // Check what section
        let section = test.section;
        let testToRemove = test.testcode;

        if(section === "CM"){
            setCmTests(cmTests.filter((test) => test.testcode !== testToRemove));
        }
        if(section === "Chemistry"){
            setChemTests(chemTests.filter((test) => test.testcode !== testToRemove));
        }
        if(section === "Hematology"){
            setHemaTests(hemaTests.filter((test) => test.testcode !== testToRemove));
        }
        if(section === "Serology"){
            setSeroTests(seroTests.filter((test) => test.testcode !== testToRemove));
        }
        if(section === "Micro"){
            setMicroTests(microTests.filter((test) => test.testcode !== testToRemove));
        }

        setTests(tests.filter((test) => test.testcode !== testToRemove));

    }

    return (
        <tr className="tbcontentremove">
            <td>{test.testname}</td>
            <td onClick={removeHandler}>Remove</td>
        </tr>
    )
}

export default Testrow
