import React, { useEffect, useState } from 'react'
import withAuthorization from "../withAuthorization";
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase'
import * as routes from '../../constants/routes'
import './Home.css'
import { Fade, Flip } from 'react-reveal'
import QuizIcon from '@mui/icons-material/Quiz';

function HomePage(props) {
  const [quizes, setQuizes] = useState([]);
  const [user,setUser] = useState([])
  const { loggedUser } = props;
  useEffect(() => {
    if(loggedUser.emailVerified)
    {
      db.allQuizes().then((snapshot) => {
      setQuizes(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    });
    db.doGetUserQuizAttempts(loggedUser.uid).then((snapshot) => {
      setUser(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    })
  }
  }, [])

  const updateStatus = (e,data,id) =>{
    db.doQuizStatusUpdate('pending',loggedUser.uid,id,0,data.max_mark,data.title)
    
   }
  useEffect(() => { console.log(user) }, [quizes,user])
  return (
    <>
      {loggedUser.emailVerified ?
        (<div className='home-cont' >
          {/* Available Quizes:
          {quizes.map((i) => <Link to={routes.QUIZ + i.id}>{i.data.title}</Link >)} */}
          <div className="profile-section">
            <Fade left>
              <div className="pic" >
                <lord-icon
                  src="https://cdn.lordicon.com/ajkxzzfb.json"
                  trigger="hover"
                  colors="primary:#4be1ec,secondary:#cb5eee"
                  style={{ width: 'inherit', height: 'inherit' }}>
                </lord-icon>
              </div>
            </Fade>
            <Fade right>
              <div className='profile' >
                <h1>
                  {loggedUser.displayName}
                </h1>
                <p style={{ marginTop: '-10px' }}>Grad Student, CSE</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div className='profile-icon' >
                    <lord-icon
                      src="https://cdn.lordicon.com/dxoycpzg.json"
                      trigger="morph"
                      colors="primary:#08a88a,secondary:#121331"
                      style={{ height: 'inherit', width: '100px', marginRight: 'auto' }}>
                    </lord-icon>
                    <p><strong>Total Quizes Taken</strong>10</p>
                  </div>
                  <div className='profile-icon' >
                    <lord-icon
                      className='icon-main'
                      src="https://cdn.lordicon.com/oegrrprk.json"
                      trigger="morph"
                      colors="primary:#08a88a,secondary:#121331"
                      style={{ height: 'inherit', width: '100px', marginRight: 'auto', '&:hover': { filter: 'none', height: '10px', width: '10px' } }}>
                    </lord-icon>
                    <p><strong>Highest Score</strong>10</p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className='dummy' >
            <Flip top>
              <div className='dummy-a'>
                <div className='quiz-heading'>
                  <h1>Active Quizes <QuizIcon sx={{ fontSize: 40 }} /></h1>
                </div>
                <div className='quiz-set' >
                  {quizes.map((i) =>(
                    <div className={'quizes-section ' + ((i.data.disabled)?"quiz-completed":"")}>
                    <div className="quiz-title">
                      <div className="main-title"><h3>{i.data.title}</h3></div>
                      <div className="max-mark">max-mark: {i.data.max_mark}</div>
                    </div>
                    <button disabled={i.data.disabled} className="take-quiz">{i.data.disabled==false?<Link to={{pathname:routes.QUIZ + i.id,query:{user_data:user,quiz_data:i.data}}} onClick={(e)=>updateStatus(e,i.data,i.id)} className='quiz-take-quiz'  style={{TextDecoration:'none',color:'inherit'}}>Take Quiz</Link >:<>Take Quiz</>}</button>
                  </div>
                     ))}
                </div>

              </div>
            </Flip>
            <Flip bottom>
              <div className='dummy-b'>
                <div className='quiz-heading'>
                  <h1>Quiz Scores </h1>
                  <lord-icon
                    src="https://cdn.lordicon.com/trxrghhv.json"
                    trigger="morph"
                    colors="primary:#ffc738,secondary:#92140c"
                    style={{ height: 'inherit', width: '100px', marginRight: 'auto' }}>
                  </lord-icon>
                </div>
                <div className='quiz-set' >
                  {user.map((quiz)=>(
                    <div className='quizes-section'>
                    <div className="quiz-title">
                      <div className="main-title"><h3>{quiz.data.title}</h3></div>
                      <div className="max-mark">max-mark: {quiz.data.t_score}</div>
                    </div> 
                    <div disabled className="score">{quiz.data.status=='pending'?<>Pending...</>:<>{quiz.data.score}/{quiz.data.t_score}</>}</div>
                  </div>
                  ))}
                </div>
              </div>
            </Flip>
          </div>
        </div>) :
        <div className='verify-container'>
          User Not verified!!
          {
            !loggedUser.emailVerified
            &&
            <button style={{ padding: '10px', borderRadius: '20px', width: '200px', backgroundFilter: 'blur(5px)', background: '#20e6c839', color: 'white' }} onClick={(e) => { auth.doEmailVerification(props) }} >Verify Email!</button>
          }
        </div>}
    </>
  )
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);