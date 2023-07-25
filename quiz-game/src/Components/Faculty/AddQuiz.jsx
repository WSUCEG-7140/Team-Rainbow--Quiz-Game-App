import React, { useEffect, useState } from 'react'
import './AddQuiz.css'
import { db } from '../../firebase'
import { Button as Botto } from 'reactstrap'
function AddQuiz(propss) {
  const [title, setTitle] = useState('')
  const createQuiz = ()=>{
    
    db.doCreateQuiz(title).then(()=>{
      alert('Quiz Created successfully!');
      propss.setIsOpen(false);
      
    }).catch((error) => {
      alert("Error creating Quiz: ", error);
    });
    
  }

  useEffect(()=>{},[title])
  return (
    <div className='add-quiz-main'>
      <div className="quiz-name-input">
        Please enter the title of the Quiz
        <input placeholder='Quiz Title' value={title} onChange={(e)=>{setTitle(e.target.value)}} ></input>
      </div>
      <Botto disabled={title.length==0} onClick={createQuiz} >Create Quiz</Botto>
    </div>
  )
}

export default AddQuiz