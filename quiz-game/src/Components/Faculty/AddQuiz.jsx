// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import './AddQuiz.css';
import { db } from '../../firebase';
import { Button as Botto } from 'reactstrap';
// @ref R80_0

//This Component is part of the @ref Model within the overall @ref ModelViewController controller.
//This Component implements the methods related to faculty features.

/**
 * AddQuiz Component: Allows Faculty to add new Quiz.
 * @param {setIsOpen} props 
 * @returns  UI with an input field and a button
 */
function AddQuiz(props) {
  // State variable to manage the title of the new quiz
  const [title, setTitle] = useState('');

  // Function to create a new quiz in the database
  const createQuiz = () => {
    // Call the Firebase function to create the quiz with the provided title
    db.doCreateQuiz(title)
      .then(() => {
        // If the quiz is created successfully, show a success alert and close the modal
        alert('Quiz Created successfully!');
        props.setIsOpen(false);
      })
      .catch((error) => {
        // If there's an error creating the quiz, show an error alert
        alert("Error creating Quiz: ", error);
      });
  };

  // useEffect hook to log the title whenever it changes
  useEffect(() => {}, [title]);

  // JSX code for rendering the AddQuiz component UI
  return (
    <div className='add-quiz-main'>
      <div className="quiz-name-input">
        {/* Input field to enter the title of the new quiz */}
        Please enter the title of the Quiz
        <input placeholder='Quiz Title' value={title} onChange={(e) => { setTitle(e.target.value) }} ></input>
      </div>
      {/* Button to create the new quiz */}
      {/* The button is disabled when the title is empty */}
      <Botto disabled={title.length == 0} onClick={createQuiz} >Create Quiz</Botto>
    </div>
  );
}

export default AddQuiz;
