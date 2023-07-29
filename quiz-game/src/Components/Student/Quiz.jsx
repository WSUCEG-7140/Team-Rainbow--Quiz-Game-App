import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { db } from '../../firebase';
import withAuthorization from "../withAuthorization";
import './Quiz.css';


// @ref R33_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to attend quiz by the user.

/**
 * Shuffle functionality 
 * @param {*} array :array of elements that you want to shuffle
 * @returns shuffled version of the input array
 * 
 */
function shuffle(array) {
    let currentIndex = array?.length == undefined ? 0 : array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
/**
 * Quiz Functionality
 * @param {*} props : contains information about logged-in user information, qid and quiz information about such as the title, max marks, etc.
 * @returns UI for the quiz page, which allows the user to take the quiz
 */
function Quiz(props) {
    
    const quiz_data = props.location.query.quiz_data
    const {loggedUser} = props;
    const id = props.match.params['id'];
    const [data, setData] = useState([])
    const [value, setValue] = React.useState('');
    const [indexer, setIndexer] = useState(0)
    const [options, setOptions] = useState([])
    const [sum,setSum] = useState(0)
    const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false)
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const validate = (event)=>{
        setIndexer(indexer + 1)
        if(data[indexer].data.answer == value )
        setSum(sum+1)
        event.preventDefault()
    }

    useEffect(() => {
        if (shouldBlockNavigation) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
        db.getQuizQuestions(id).then((snapshot) => {
            setData(shuffle(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))))
        })
    }, [])

    useEffect(() => {
        setValue('')
        if (indexer < data?.length){
            setShouldBlockNavigation(true)
        }
        if(indexer => data.length){
            db.doQuizStatusUpdate('Completed',loggedUser.uid,id,sum,quiz_data.max_mark,quiz_data.title)
        }
        if (data != [] && data[indexer] !== undefined) {
            setOptions(shuffle(data[indexer].data.options))
        }
    }, [indexer])
    useEffect(()=>{},[shouldBlockNavigation])
    useEffect(() => {
        setIndexer(0)
        if (indexer < data?.length){
            setShouldBlockNavigation(true)
            
        }
        if (data != [] && data[indexer] !== undefined) {
            setOptions(shuffle(data[indexer].data.options))
        }
    }, [data])

    return (
        <div className='quizContainer'>
            <div className='q-no' >
                Total Questions:
                <ul>
                {[...Array(data?.length)].map((x, i) =>
    <li className={'option ' + (i<indexer?' completed':i==indexer?' current':'')} >{i+1}</li>
  )}
                </ul>
            </div>
            <div className='q-cont' >
                {(indexer < data?.length) ? (
                    <>
                        <>
                            <Prompt
                                when={shouldBlockNavigation}
                                message='You quiz is not yet completed, are you sure you want to leave?'
                            />
                            {/* Component JSX */}
                        </>
                        <div className='question' >
                            Question - {indexer + 1}
                            <h2>{data[indexer].data.question}</h2>
                        </div>
                        <div className='options'>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={value}
                                onChange={handleRadioChange}
                                style={{ width: '100%', marginLeft: '100px' }}
                            >
                                {options?.map((i) =>
                                    <FormControlLabel value={i} control={<Radio />} label={i} />
                                )}

                            </RadioGroup>
                        </div>
                        {value == '' ? (<button className='student_next' disabled >Next Question ▶  </button>) :
                            (<button className='student_next' onClick={validate} >Next Question ▶  </button>)}
                    </>
                ) : (
                    <div style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>
                        You have reached the end of Quiz!!<br></br>
                        Your score for this Quiz: {sum}
                    </div>
                )}


            </div>
        </div>
    )
}
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Quiz);