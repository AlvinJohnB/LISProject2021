import React from 'react'
import './modal.css'

const Testrow = ({setHemaFee, hemaFee, setSeroFee, seroFee, setCmFee, cmFee, totalCost, setTotalCost, totalFee, chemFee, setTotalFee, setChemFee, setTests, test, tests, setCmTests, cmTests, chemTests, setChemTests, hemaTests, setHemaTests, seroTests, setSeroTests, microTests, setMicroTests}) => {
    const removeHandler = () => {
        
        // Check what section
        let section = test.section;
        let testToRemove = test.testcode;
        let costToRemove = test.cost

        if(section === "CM"){
            setCmTests(cmTests.filter((test) => test.testcode !== testToRemove));
            setCmFee(cmFee.filter((fee) => fee !== costToRemove));
        }
        if(section === "Chemistry"){
            setChemTests(chemTests.filter((test) => test.testcode !== testToRemove));
            setChemFee(chemFee.filter((fee) => fee !== costToRemove));
        }
        if(section === "Hematology"){
            setHemaTests(hemaTests.filter((test) => test.testcode !== testToRemove));
            setHemaFee(hemaFee.filter((fee) => fee !== costToRemove));
        }
        if(section === "Serology"){
            setSeroTests(seroTests.filter((test) => test.testcode !== testToRemove));
            setSeroFee(seroFee.filter((fee) => fee !== costToRemove));
        }
        if(section === "Micro"){
            setMicroTests(microTests.filter((test) => test.testcode !== testToRemove));
        }

        setTests(tests.filter((test) => test.testcode !== testToRemove));
        setTotalFee(totalFee.filter((fee) => fee !== costToRemove));

    }

    return (
        <tr className="tbcontentremove">
            <td>{test.testname}</td> 
            <td>PHP {test.cost}</td>
            <td onClick={removeHandler}>Remove</td>
        </tr>
    )
}

export default Testrow
