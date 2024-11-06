import React from 'react';

function GetQuestions({ questions }) {
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Questions</h1>
      <div className="w-3/4">
        {questions.map((questionObj, index) => (
          <div key={index} className="mb-8 p-6 border rounded-lg shadow-lg bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">{questionObj.question}</h2>
            <ul className="list-disc pl-6 space-y-2">
              {questionObj.options.map((option, optIndex)=>(
                <li key={optIndex} className="text-gray-700">{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetQuestions;
