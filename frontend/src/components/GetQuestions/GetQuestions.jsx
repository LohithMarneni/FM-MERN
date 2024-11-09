import React, { useState } from 'react';

function GetQuestions({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores answers for each question

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionChange = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers); // Pass answers to the parent component
  };

  return (
      <>
        <h1 className="text-2xl mb-6 text-orange-600">
          Answer these FM's
        </h1>
        <div className="w-full">
          <h2 className="text-xl mb-6 text-white">
            {questions[currentQuestionIndex].question}
          </h2>
          <form className='space-y-6 ml-2'>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="relative ml-2">
                <label className="text-white cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(option)}
                    className="form-radio text-orange-500 focus:ring-orange-400"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </form>
          <div className="relative">
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                className="bg-green-500 text-white py-2 px-4 rounded-md mt-5 w-1/3"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn w-2/3 bg-orange-200 text-green-900 py-2 rounded hover:bg-orange-600 hover:text-white mt-5"
              >
                Submit
              </button>
            )}
          </div>
        </div>
    </>
  );
}

export default GetQuestions;
