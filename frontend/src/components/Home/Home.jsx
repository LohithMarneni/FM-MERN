import React, { useState } from 'react';
import GetQuestions from "../GetQuestions/GetQuestions";
import { server } from '../../main';
import useUserContext from '../../context/userContext';
import { Navigate } from 'react-router-dom';
import DisplaySuggestions from "../DisplaySuggestions/DisplaySuggestions";

function Home() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // State to store suggestions
  const { isAuthenticated, Loader, setLoader } = useUserContext();

  const handleSubmit = async (answers) => {
    console.log("Quiz submitted!", answers);
  
    // Convert answers object into an array of options
    const answersArray = Object.values(answers); // This will get an array of selected answers
  
    try {
      const response = await fetch(`${server}/questions/get-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ answers: answersArray }), // Send as an array
      });
      if (!response.ok) {
        const errorDetails = await response.text();  // or response.json() if it's JSON
        console.error(`HTTP error! status: ${response.status}`, errorDetails);
        throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
      }
  
      const data = await response.json();
      setSuggestions(data); // Set the fetched suggestions to state
      console.log("Answers submitted successfully!");
      setStart(false); // Keep the state `false` after submission to show suggestions
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  
  const handleClick = async () => {
    try {
      setLoader(true);
      console.log("Fetching questions...");
      const response = await fetch(`${server}/questions/get-questions`, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuestions(data);
      console.log(data);
      setStart(true);
      setLoader(false);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`flex justify-center ${!start && suggestions.length === 0 ? 'items-center mt-40 h-full' : 'm-5'}`}>
      <div className={`bg-green-100 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg ${!start && suggestions.length === 0 ? 'w-2/6' : 'w-auto'} max-w-full font-mono font-bold text-center`}>
        {(!start && suggestions.length === 0) ? (
          <button
            className="w-2/3 h-16 rounded-md bg-green-300 py-2 px-4"
            type="button"
            onClick={handleClick}
          >
            Mood Munch!
          </button>
        ) : (
          <>
            {suggestions.length > 0 ? (
              <DisplaySuggestions suggestions={suggestions} />
            ) : (
              <GetQuestions questions={questions} onSubmit={handleSubmit} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
