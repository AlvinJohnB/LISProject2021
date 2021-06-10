import React from 'react'

const Testrow = ({setTests, test, tests}) => {
    const removeHandler = () => {
        let testToRemove = test.index;
        setTests(tests.filter((test) => test.index !== testToRemove))
    }
    return (
        <tr>
            <td>{test.testname}</td>
            <td onClick={removeHandler}>Remove</td>
        </tr>
    )
}

export default Testrow
