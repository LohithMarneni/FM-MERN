import React, { useState } from 'react';
import GetQuestions from "../GetQuestions/GetQuestions";
function Home() {
  const [start, setStart] = useState(false);
  const [questions,setQuestions] = useState([]);
  const handleClick=async ()=>{
    try{
      console.log("Fetching questions...");
      const response = await fetch('http://localhost:4000/api/v1/questions/get-questions', {
        credentials: "include"
    });
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data=await response.json();
      setQuestions(data);
      console.log(data);
      setStart(true);
    }
    catch(e){
      console.log(`Error: ${e}`);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      {(!start)?<button
        className="w-1/4 h-16 rounded-md bg-green-300 py-2 px-4"
        type="button" onClick={()=>handleClick()}
      >
        Mood Munch!
      </button>: (<GetQuestions questions={questions}/>)}
    </div>
  );
}

export default Home;
