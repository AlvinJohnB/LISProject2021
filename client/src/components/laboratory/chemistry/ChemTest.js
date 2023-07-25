import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import host from '../../../config.json'

function ChemTest({test, ptdata, status}) {

    let history = useHistory();

    const saveResult = async (e) => {
        const result = e.target.value;
        const sResultID = test.id
        console.log(result)
        if(result === ""){
            console.log("No result entered");
        }else{
            await axios.post(`http://${host.ip}:3001/order/result/update/${sResultID}`,{result: result, gender: ptdata.gender},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((response) => {
                console.log(`Result saved: Entered ${result} for ResId ${sResultID}`);
                if(response.data.error){
                    alert("You are not logged in. Please log-in!");
                    history.push('/login');
                }
            }).catch((err) => {
                console.log("Error in saving result");
            })
        }
        
    }


    if(test.Testslist.isPackage){
        return (

            <tr className="rform-header">
                <td colSpan={4}><strong>{test.Testslist.testname}</strong></td>
            </tr>

        )
    }else{
        if(ptdata.gender === "Male"){
            if(test.isQuali === true){
                const options = test.options.split(',');
                return (
                    <tr className="rform">
                        <td >{test.Testslist.testname}</td>
                        {status === "RUNNING" && 
                            <td>
                                <select onChange={saveResult}>
                                    <option></option>
                                    {options.map((option, index) => {
                                        if(test.result === option){
                                        return(
                                            <option selected={true} key={index}>{option}</option>
                                            )
                                        }else{
                                            return(<option key={index}>{option}</option>)
                                        }
                                    })}
                                </select>
                            </td>}
                        {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                        <td>{test.Testslist.unit}</td>
                        <td>{test.Testslist.Referencevalue.Male}</td>
                    </tr>
            )        
            }else{
                return(
                <tr className="rform">
                    <td >{test.Testslist.testname}</td>
                    {status === "RUNNING" && test.isQuali === false && <td><input onBlur={saveResult} className="rform-input" type="text" placeholder={test.result} /></td>}
                    {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                    <td>{test.Testslist.unit}</td>
                    <td>{test.Testslist.Referencevalue.Male}</td>
                </tr>                    
                )
            }
        }else{
            if(test.isQuali === true){
                const options = test.options.split(',');
                return (
                    <tr className="rform">
                        <td >{test.Testslist.testname}</td>
                        {status === "RUNNING" && 
                            <td>
                                <select onChange={saveResult}>
                                    <option></option>
                                    {options.map((option, index) => {
                                        return(<option key={index}>{option}</option>)
                                    })}
                                </select>
                            </td>}
                        {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                        <td>{test.Testslist.unit}</td>
                        <td>{test.Testslist.Referencevalue.Male}</td>
                    </tr>
            )        
            }else{
                return(
                <tr className="rform">
                    <td >{test.Testslist.testname}</td>
                    {status === "RUNNING" && test.isQuali === false && <td><input onBlur={saveResult} className="rform-input" type="text" placeholder={test.result} /></td>}
                    {status === "RELEASED" && <td><input disabled={true} className="rform-input" type="text" value={test.result} /></td>}
                    <td>{test.Testslist.unit}</td>
                    <td>{test.Testslist.Referencevalue.Male}</td>
                </tr>                    
                )
            }
        }
    }

}

export default ChemTest
