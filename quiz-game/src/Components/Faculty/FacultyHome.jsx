import React, { useEffect, useState } from 'react'
import withAuthorization from "../withAuthorization";
import AddCardIcon from '@mui/icons-material/AddCard';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase'
import * as routes from '../../constants/routes'
import './FacultyHome.css'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import ResultGraph from './ResultGraph';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactModal from 'react-modal';
import AddQuiz from './AddQuiz';
import EditQuiz from './EditQuiz';
import { Fade } from 'react-reveal';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function FacultyHome() {

  const [quizData, setQuizData] = useState([])
  const [activeQuiz, setActiveQuiz] = useState()
  const [quizAttempts, setQuizAttempts] = useState([])
  const [addQuizModal,setAddQuizModal] = useState(false)
  const [EditQuizModal,setEditQuizModal] = useState(false)

  const doUpdate =(id,status)=>{
    console.log(activeQuiz)
    let data = activeQuiz.data
    db.doQuizStatus_Enable_Disable(id, status).then(()=>{
      data['disabled']=!status;
      console.log(data)
    setActiveQuiz({...activeQuiz, data: data})})
  }
  useEffect(() => {
    db.doTotalQuizesData().onSnapshot((snapshot) => {
      setQuizData(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    })
  }
    , [])

  useEffect(() => { console.log(quizData) }, [quizData])
  useEffect(() => {
    console.log('Active Quiz Object: ', activeQuiz); 
    db.doGetQuizAttemps(activeQuiz?.id).then((snapshot) => {
      setQuizAttempts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    })
  }, [activeQuiz])

  return (
    <div className="faculty-home">
      <Fade left>
      <div className="faculty-quizes">
        <div className='faculty-quiz-heading'>
          <h1>All Quizes </h1>
        </div>
        <div className="add-quiz-faculty">
          <h3 style={{ textDecoration: 'none' }} onClick={()=>{setAddQuizModal(true)}} >Add Quiz <AddCardIcon style={{ fontSize: 'inherit' }} /></h3>
          
          <ReactModal
          isOpen={addQuizModal}
          contentLabel="Example Modal"
          onRequestClose={()=>setAddQuizModal(false)}
          className='add-quiz-modal'
          overlayClassName="add-quiz-modal-overlay"
          >
            <button onClick={()=>{setAddQuizModal(false)}} > X </button>
            <AddQuiz setIsOpen={(e)=>{setAddQuizModal(e)}} />
          </ReactModal>
          
          <ReactModal
          isOpen={EditQuizModal}
          contentLabel="Example Modal"
          className='add-quiz-modal'
          overlayClassName="add-quiz-modal-overlay"
          >
            <button onClick={()=>{setEditQuizModal(false)}} > X </button>
            <EditQuiz qid={activeQuiz?.id} setIsOpen={(e)=>{setEditQuizModal(e)}} />
          </ReactModal>
        </div>
        
        <div className="faculty-quiz-set "  >
          {
            quizData.map((i,index) => (
              <div className={'quizes-section faculty-quizes-section ' + ((activeQuiz == i) ? 'faculty-active-quiz' : '')} onClick={() => { console.log('Qid: ', i.id); setActiveQuiz(i) }}>
                {(activeQuiz == undefined) ? setActiveQuiz(i):''}
                <div className="quiz-title">
                  <div className="main-title"><h3>{i.data['title']}</h3></div>
                  <div className="max-mark">max-mark: {i.data['max_mark']}</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <button className="take-quiz" onClick={()=>{setEditQuizModal(true)}}>Edit <AppRegistrationIcon /></button>
                  <button className="take-quiz" onClick={(e)=>{confirm('Do you want to delete the Quiz?')?db.doDelteQuiz(i.id):''}} >Delete <DeleteForeverIcon/></button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      </Fade>
      <Fade right>
      {activeQuiz!=undefined && <div className="faculty-home-admin">
        <div className="quiz-title">
          <div className="main-title" style={{ margin: 'auto', marginBottom: '10px' }}><h3 style={{ filter: 'none' }}>Title : {activeQuiz?.data?.title} [ max mark: {activeQuiz?.data?.max_mark} ]</h3></div>
        </div>
        <ul className="faculty-quiz-props">
          <li style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto', textAlign: 'center' }}>
            <h5 style={{ margin: 'auto' }}>Quiz Status</h5>
            <IOSSwitch sx={{ m: 2 }} checked={!activeQuiz?.data?.disabled} onClick={(e) => { console.log(activeQuiz?.id); confirm('Do want to ' + (activeQuiz?.data?.disabled? 'Enable' : 'Disable') + ' the '+ activeQuiz?.data?.title +'?') == true ? doUpdate(activeQuiz?.id, activeQuiz?.data?.disabled) : '' }} />
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto', textAlign: 'center' }}>
            <h5 style={{ margin: 'auto' }}>Attempts : {quizAttempts.length}</h5>
          </li>
        </ul>
        <div className="faculty-quiz-results">
          <ResultGraph data={quizAttempts} quiz={activeQuiz?.data} />
        </div>
      </div>}
      </Fade>
    </div>
  )
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(FacultyHome);