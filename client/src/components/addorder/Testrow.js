import React from 'react'

import './modal.css'
const Testrow = ({setTests, test, tests}) => {

    const removeHandler = () => {
        
        let testToRemove = test.index;
        setTests(tests.filter((test) => test.index !== testToRemove));

    }

    return (
        <tr className="tbcontentremove">
            <td>{test.testname}</td>
            <td onClick={removeHandler}>Remove</td>
        </tr>
    )
}

export default Testrow
