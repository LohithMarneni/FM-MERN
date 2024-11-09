import React from 'react';

function DisplaySuggestions({ suggestions }) {
  return (
    <div className="space-y-4">
      <h2 className='text-2xl mb-6 text-orange-400 hover:text-white'>Your FM's 3 Suggestions</h2>
      {suggestions.map((suggestion, index) => (
        <div key={index} className=" p-4 rounded-md shadow-md">
          <h3 className="text-2xl font-bold text-green-700 hover:text-white">{suggestion.food}</h3>
          <p className="text-black">{suggestion.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplaySuggestions;
