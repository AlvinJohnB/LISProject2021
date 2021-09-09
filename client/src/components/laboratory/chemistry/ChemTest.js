import React from 'react'


function ChemTest({test}) {

   

    if(test.Testslist.isPackage){
        return (

            <tr>
                <td colSpan={4}><strong>{test.Testslist.testname}</strong></td>
            </tr>

        )
    }else{
        return (

            <tr>
                <td>{test.Testslist.testname}</td>
                <td><input type="text" value={test.result} /></td>
                <td></td>
                <td></td>
            </tr>

        )
    }

}

export default ChemTest
