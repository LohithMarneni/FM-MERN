import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../../main';
function AboutMe() {
  const [aboutData, setAboutData] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get(`${server}/aboutFM`).then((res) => {
      // console.log(res);
      if (res.data.success) {
        setAboutData(res.data.data);
      } else {
        setError("Failed to fetch data.");
      }
    }).catch((error)=>{
      setError(error.message || "An error occurred.");
    })
  },[]);//loads my data when webpage is loaded
  return (
    <div className='flex justify-center m-5 h-2/3'>
      <div className="about-me bg-green-100 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-3/4 font-mono font-bold text-center">
        <h2 className='text-2xl mb-2 text-white hover:text-orange-400'>About FM</h2>
        <div className="info">
          <br />
          {error?(
            <p className="error-message">{error}</p>
          ):(
            <p className="about-data">{aboutData}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutMe
