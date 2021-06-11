import React from 'react'

const Testrow = ({setTests, test, tests, submitHandler}) => {

    const removeHandler = () => {

        let testToRemove = test.index;
        setTests(tests.filter((test) => test.index !== testToRemove))
        console.log(tests)
    }

    return (
        <tr>
            <td>{test.testname}</td>
            <td onClick={removeHandler}>Remove</td>
        </tr>
    )
}

export default Testrow
