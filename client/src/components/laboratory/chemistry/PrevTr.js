import React from 'react'

function PrevTr({prevResultData, test}) {
    
    return (
        <tr className="lab tbcontent">
                <td></td>
                <td></td>
                <td></td>
                <td>Select</td>
        </tr>
    )

    // if(test.Testslist.isPackage){
    //     return (

    //         <tr className="rform-header">
    //             <td colSpan={4}><strong>{test.Testslist.testname}</strong></td>
    //         </tr>

    //     )
    // }else{
    //     if(prevResultData.gender === "Male"){
    //         return (
    //             <tr className="rform">
    //                 <td >{test.Testslist.testname}</td>
    //                 <td>{test.Testslist.unit}</td>
    //                 <td>{test.Testslist.Referencevalue.Male}</td>
    //             </tr>
    //     )}else{
    //         return (
    //             <tr className="rform">
    //                 <td>{test.Testslist.testname}</td>
    //                 <td>{test.Testslist.unit}</td>
    //                 <td>{test.Testslist.Referencevalue.Female}</td>
    //             </tr>
    //     )
    //     }
    // }
}

export default PrevTr
