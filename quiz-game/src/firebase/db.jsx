//this is going to store Firebase realtime database API code
import { db } from "./firebase";

//Get All Quizes
export const allQuizes = () => db.collection('Quizes').get()

//Get Questions of a particular Quiz using Quiz ID
export const getQuizQuestions  = (id) => db.collection('Quizes').doc(id).collection('Questions').get()

//Create an User
export const doCreateUser = (id, username, email) =>
  db.collection('users').doc(id).set({
    username,
    email,
    verified:false,
    h_score:0,
    t_quizes:0,

  });

//returns all users from firebase realtime db
export const onceGetUsers = () => db.collection('users').get();

//Get an user using UID
export const doGetAnUnser = uid => db.collection('users').doc(uid).get();

//Get user quizes attempts
export const doGetUserQuizAttempts = (uid) => db.collection('users').doc(uid).collection('quizes').get();

//Update the status of quiz, parameters: Status - status of quiz; UID -> user ID; qid -> Quiz ID; score -> score obtained in quiz; t_score -> total score
export const doQuizStatusUpdate = (status,uid,qid,score,t_score,title) => {
  db.collection('users').doc(uid).collection('quizes').doc(qid).set({
    "score": score,
    "status":status,
    "title":title,
    "t_score": t_score
  }).then(()=>console.log('Updated bd!'))
}


// other APIs could come below
