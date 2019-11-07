import React from 'react'
import { WhisperSpinner } from "react-spinners-kit";

const Loader = () => {
    return (
        
        <center>
            <h1 className='mt-5 p-5'>Loading...</h1>
            <WhisperSpinner
            size='500'
            color="#686769"
            loading='true'
            frontColor="#386769"
            backColor="#646459"
            className="mt-5"
  />
</center>


    )
}

export default Loader
    