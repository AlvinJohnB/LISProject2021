import React from 'react';




import './ptsearch.css';

const Ptsearch = () => {

  return (
    <div className="ptsearchwrapper">

        <h1>Patient Search:</h1>
        <hr />
        <form>
            <div className="form-group">

            <div className="form-content">
                    <label className="form-content" htmlFor="lastnamesearch">Last name:</label>
                    <input className="form-content" type="text" name="lastnamesearch" placeholder="Last name" />
                </div>
                <div className="form-content">
                    <label className="form-content" htmlFor="firstnamesearch">First name:</label>
                    <input className="form-content" type="text" name="firstnamesearch" placeholder="First name" />
                </div>
            </div>

            <input className="form-content form-botton" type="button" value="Search" />

        </form>

    </div>
  );
}

export default Ptsearch;
