import React from 'react'

function PrevTr({prevResultData, test}) {


    if(test.Testslist.isPackage === true){
        return(<tr className="rform-header">
        <td colSpan={4}><strong>{test.Testslist.testname}</strong></td>
    </tr>)
    }else{
        if(prevResultData.Patientlists[0].gender === "Male"){
            return (
                <tr className="rform">
                <td >{test.Testslist.testname}</td>
                <td>{test.result}</td>
                <td>{test.Testslist.unit}</td>
                <td>{test.Testslist.Referencevalue.Male}</td>
            </tr>
            )
        }else{
            return (
                <tr className="rform">
                <td >{test.Testslist.testname}</td>
                <td>{test.result}</td>
                <td>{test.Testslist.unit}</td>
                <td>{test.Testslist.Referencevalue.Female}</td>
                </tr>
            )
        }
    }
}

export default PrevTr
