import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ChemTest({test, ptdata, status}) {

    let history = useHistory();

    const saveResult = async (e) => {
        const result = e.target.value;
        const sResultID = test.id
        
        await axios.post(`http://localhost:3001/order/result/update/${sResultID}/${result}`,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(response.data.error){
                alert("You are not logged in. Please log-in!");
                history.push('/login');
            }
        }).catch((err) => {
            console.log("Result not updated");
        })
    }


    if(test.Testslist.isPackage){
        return (

            <tr className="rform-header">
                <td colSpan={4}><strong>{test.Testslist.testname}</strong></td>
            </tr>

        )
    }else{
        if(ptdata.gender === "Male"){
            return (

                <tr className="rform">
                    <td >{test.Testslist.testname}</td>
                    {status === "RUNNING" && <td><input onBlur={saveResult} className="rform-input" type="text" placeholder={test.result} /></td>}
                    {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                    <td>{test.Testslist.unit}</td>
                    <td>{test.Testslist.Referencevalue.Male}</td>
                </tr>
        )}else{
            return (
                <tr className="rform">
                    <td>{test.Testslist.testname}</td>
                    {status === "RUNNING" && <td><input onBlur={saveResult} className="rform-input" type="text" placeholder={test.result} /></td>}
                    {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                    <td>{test.Testslist.unit}</td>
                    <td>{test.Testslist.Referencevalue.Female}</td>
                </tr>
        )
        }
    }

}

export default ChemTest
