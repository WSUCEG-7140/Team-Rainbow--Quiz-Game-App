// Import necessary modules and components
import React from 'react';
import './EditQuiz.css';
import { db } from '../../firebase';
import { Button as Butto } from '@mui/material';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import isEqual from 'lodash.isequal';
import { Zoom } from 'react-reveal';

// @ref R22_0

//This Component is part of the @ref Model within the overall @ref ModelViewController controller.
//This Component implements the methods related to faculty features.

// Custom styled TextField component to disable underline
const CustomTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        color: '#fee20d',
    },
}));

function EditQuiz({ qid }) {
    // State variables to manage the quiz questions and selected question
    const [qCount, setQcount] = useState(1);
    const [indexer, setIndexer] = useState(0);
    const [value, setValue] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState([]);
    const [changed, setChanged] = useState(false);
    const [currentQ, setCurrentQ] = useState({
        'id': '',
        'question': '',
        'option1': '',
        'option2': '',
        'option3': '',
        'option4': '',
        'answer': '',
        'point': 0,
    });

    // Firebase snapshot listener to fetch the quiz questions from the database
    let unsubscribe = '';
    useEffect(() => {
        unsubscribe = db.doTotalQuizesData().doc(qid).collection('Questions').onSnapshot(
            (snapshot) => {
                setTotalQuestions(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
            }
        );
    }, []);

    // Function to create an empty question for the quiz
    const CreateEmptyQuestion = () => {
        db.doNewQuizQuestions(qid, {
            question: '',
            options: ['', '', '', ''],
            point: '',
            answer: ''
        }).then(() => {
            setValue(currentQ);
        }).catch((error) => {
            console.log(error);
            alert("Error removing Quiz: ", error);
        });
    };

    // Function to update the current question in the database
    const updateQuestion = () => {
        db.doUpdateQuizQuestions(qid, currentQ.id, {
            question: currentQ?.question,
            options: [currentQ?.option1, currentQ?.option2, currentQ?.option3, currentQ?.option4],
            point: currentQ?.point,
            answer: currentQ?.answer
        }).then(() => {
            setValue(currentQ);
        }).catch((error) => {
            console.log(error);
            alert("Error removing Quiz: ", error);
        });
    };

    // Function to search for a question in the totalQuestions array by id
    function search(nameKey, myArray) {
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].id === nameKey) {
                return myArray[i];
            }
        }
    }

    // useEffect hooks to monitor changes in totalQuestions, indexer, currentQ, and value
    useEffect(() => { console.log(totalQuestions); setChanged(!isEqual(currentQ, value)); }, [totalQuestions]);
    useEffect(() => {
        let res = search(indexer, totalQuestions);
        setCurrentQ({
            'id': res?.id,
            'question': res?.data?.question,
            'option1': res?.data?.options[0],
            'option2': res?.data?.options[1],
            'option3': res?.data?.options[2],
            'option4': res?.data?.options[3],
            'answer': res?.data?.answer,
            'point': res?.data?.point
        });
        setValue({
            'id': res?.id,
            'question': res?.data?.question,
            'option1': res?.data?.options[0],
            'option2': res?.data?.options[1],
            'option3': res?.data?.options[2],
            'option4': res?.data?.options[3],
            'answer': res?.data?.answer,
            'point': res?.data?.point
        });
        setChanged(!isEqual(currentQ, value));
    }, [indexer]);
    useEffect(() => {
        console.log(currentQ, value);
        console.log(!isEqual(currentQ, value));
        setChanged(!isEqual(currentQ, value));
    }, [currentQ]);
    useEffect(() => { setChanged(!isEqual(currentQ, value)); }, [value]);

    // Function to validate and change the selected question index
    const validate = (id) => {
        if (changed) {
            if (confirm('You have not saved your changes! Do you want to move to another question?') == true)
                setIndexer(id);
        }
        else {
            setIndexer(id);
        }
    };

    // Function to delete the current question
    const DeleteQuestion = () => {
        if (confirm('Do you really want to delete this question?') == true)
            db.doDeleteQuestion(qid, currentQ.id).then(() => { alert('Question deleted successfully!'); setIndexer(totalQuestions[0].id); });
    };

    // JSX code for rendering the EditQuiz component UI
    return (
        <div className='edit-quiz-main'>
            <Zoom duration={500}>
                <div className="questions-edit-quiz q-no">
                    Questions:
                    <ul>
                        {/* Display the list of questions with a click event to select a question */}
                        {totalQuestions.map((x, i) =>
                            <Zoom bottom delay={500}>
                                <li disabled className={'option ' + (changed ? ' completed' : '')} value={x.id} onClick={() => { validate(x.id); }} >{i + 1}</li></Zoom>
                        )}
                    </ul>
                </div>
            </Zoom>
            <Zoom duration={500}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                    <div className='q-cont faculty-quiz-add' >
                        <div className='question' >
                            Indexer - {indexer}
                            <h2>Question : </h2>
                            {/* Input field to enter the question */}
                            <textarea style={{ width: '100%', height: '100px' }} className='add-q-input' placeholder='Write your question here...' value={currentQ?.question} onChange={(e) => { setCurrentQ({ ...currentQ, question: e.target.value }); }} ></textarea>
                        </div>
                        <div className='options'>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={currentQ?.answer}
                                
                                onChange={(e) => { setCurrentQ({ ...currentQ, answer: e.target.value }) }}
                                style={{ width: '100%', marginLeft: '100px' }}
                            >
                                <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                    <FormControlLabel value={currentQ?.option1} control={<Radio />} />
                                    <CustomTextField
                                        required
                                        variant='filled'
                                        color='warning'
                                        label="option-1"
                                        value={currentQ?.option1}
                                        onChange={(e) => setCurrentQ({ ...currentQ, option1: e.target.value })}
                                        style={{ color: 'white' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                    <FormControlLabel value={currentQ?.option2} control={<Radio />} />
                                    <CustomTextField
                                        required
                                        variant='filled'
                                        color='warning'
                                        label="option-2"
                                        value={currentQ?.option2}
                                        onChange={(e) => setCurrentQ({ ...currentQ, option2: e.target.value })}
                                        style={{ color: 'white' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                    <FormControlLabel value={currentQ?.option3} control={<Radio />} />
                                    <CustomTextField
                                        required
                                        variant='filled'
                                        color='warning'
                                        label="option-3"
                                        value={currentQ?.option3}
                                        onChange={(e) => setCurrentQ({ ...currentQ, option3: e.target.value })}
                                        style={{ color: 'white' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                    <FormControlLabel value={currentQ?.option4} control={<Radio />} />
                                    <CustomTextField
                                        required
                                        variant='filled'
                                        color='warning'
                                        label="option-4"
                                        value={currentQ?.option4}
                                        onChange={(e) => setCurrentQ({ ...currentQ, option4: e.target.value })}
                                        style={{ color: 'white' }}
                                    />
                                </div>

                            </RadioGroup>

                        </div>
                    </div>
                    <div style={{ display: 'flex', margin: 'auto', justifyContent: 'space-evenly', width: '100%', padding: '15px' }}>
                        <Butto className='' color='error' variant='contained' onClick={() => { DeleteQuestion() }}  >Delete Question <DeleteForeverIcon />  </Butto>
                        <Butto className='add-q' onClick={() => CreateEmptyQuestion()} disabled={qCount > 9 ? true : false}>Create Question ▶  </Butto>
                        <Butto className='' disabled={!changed} color='success' variant='contained' onClick={() => updateQuestion()}  >Save Question <SaveAsIcon /> </Butto>
                    </div>
                </div>
            </Zoom>
        </div>
    )
}

export default EditQuiz
