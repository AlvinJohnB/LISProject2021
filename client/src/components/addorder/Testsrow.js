import React from 'react'
// import { useState } from 'react'
import axios from 'axios'
import './modal.css'
import host from '../../config.json'

const Testsrow = ({isDiscounted, setCmFee, cmFee, setHemaFee, hemaFee, setSeroFee, seroFee, totalCost, setTotalCost, totalFee, chemFee, setTotalFee, setChemFee, setTestsList, setHemaTests, setCmTests, setSeroTests, setMicroTests, testcode, testname, test, testlist, close, cmTests, microTests, hemaTests, chemTests, seroTests, setChemTests }) => {
    
    const handleClick = () => {
        let testSelected = test;
        let sec = test.section
        // console.log(test)
        
        // Check if BRANCH PKG plus logic
        if(sec === "Package"){
            
            // fetch tests
            axios.get(`http://${host.ip}:3001/test/pkg/${testSelected.testcode}`).then((response) => {
            let testpkg = response.data.tests.split(',') // split tests
            // check for duplicate test
            for(let n = 0; n < testpkg.length; n++){

                if(testlist.length >=1){

                    for(let i=0; i < testlist.length; i++){
                        let encodedTest = testlist[i].testcode
                        if(testpkg[n] === encodedTest){
                            alert("Duplicated test detected, please recheck encoded tests!")
                        }else{
                            // updatec
                            
                        }
                    }
                }

            }

            

            })
            
            
        }else{
        
        }

        // Check for duplicate
        let duplicate = false;
        let notDuplicate = true;
        let key = testlist.length;

        if(testlist.length >= 1){
            for(let i = 0; i < testlist.length; i++){
                let test = testlist[i].testcode;
                if(testSelected.testcode === test){
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
                if(isDiscounted === true){
                    setChemFee([...chemFee, testSelected.discCost])
                }else{
                    setChemFee([...chemFee, testSelected.cost])    
                }
            }else if(section === "Hematology"){
                setHemaTests([...hemaTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
                if(isDiscounted === true){
                    setHemaFee([...hemaFee, testSelected.discCost])
                }else{
                    setHemaFee([...hemaFee, testSelected.cost])    
                }
            }else if(section === "CM"){
                setCmTests([...cmTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
                if(isDiscounted === true){
                    setCmFee([...cmFee, testSelected.discCost])
                }else{
                    setCmFee([...cmFee, testSelected.cost])    
                }
           }else if(section === "Serology"){
                setSeroTests([...seroTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
                if(isDiscounted === true){
                    setSeroFee([...seroFee, testSelected.discCost])
                }else{
                    setSeroFee([...seroFee, testSelected.cost])
                }
            }else if(section === "Micro"){
                setMicroTests([...microTests, {testname: testSelected.testname, testcode: testSelected.testcode, section: testSelected.section}])
            }

            setTestsList([...testlist, {testname: testSelected.testname,discCost: testSelected.discCost,cost: testSelected.cost, testcode: testSelected.testcode, section: testSelected.section, index: key} ])
            if(isDiscounted === true){
                setTotalFee([...totalFee, testSelected.discCost])
            }else{
                setTotalFee([...totalFee, testSelected.cost])
            }
            

            close();
        }
    }

    return (
        <tr className="tbcontent">
            <td className="width-1" onClick={handleClick}>{testcode}</td>
            <td className="width-2" onClick={handleClick}>{testname}</td>
            <td className="width-1" onClick={handleClick}>Select</td>
        </tr>
    )
}

export default Testsrow
