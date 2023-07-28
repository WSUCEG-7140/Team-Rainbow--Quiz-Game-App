//this is going to store Firebase realtime database API code
import { db } from "./firebase";

//Get All Quizes%
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
  }).then(()=>console.log('Updated User records for quizes!'));
  db.collection('Quizes').doc(qid).collection('attempts').doc(uid).set({"score": score,
  "status":status}).then(()=>console.log('Updated Quiz attempt records!'));
}

//-------------Faculty Quieris------------------

//Create a quiz with the given title
export const doCreateQuiz = (title) => db.collection('Quizes').doc().set({
  'title':title,
  'disabled':true,
  'max_mark':0
})

//Get All Quizes Data
export const doTotalQuizesData = () => db.collection('Quizes')

//Delete full quiz
export const doDelteQuiz = (qid) => db.collection('Quizes').doc(qid).delete().then(() => {
 
}).catch((error) => {
  alert("Error removing Quiz: ", error);
});


//Accessing the Users Attempts Data from a specific quiz using the unique quiz identifier
export const doGetQuizAttemps = (qid) => db.collection('Quizes').doc(qid).collection('attempts').get()

//Updating quiz status --> Enabled or Disabled
export const doQuizStatus_Enable_Disable = (qid,status) => db.collection('Quizes').doc(qid).update({disabled: !status})

//Editing Quizes using unique quiz identifier and the unique question identifier
export const doUpdateQuizQuestions = (uqid,qid,data) => db.collection('Quizes').doc(uqid).collection('Questions').doc(qid).set(data)

//Editing Quizes using unique quiz identifier and the unique question identifier
export const doNewQuizQuestions = (uqid,data) => db.collection('Quizes').doc(uqid).collection('Questions').doc().set(data)

//Delete a Question from a quiz using the unqiue identfiers of both quiz and question
export const doDeleteQuestion = (qid,question_id) => db.collection('Quizes').doc(qid).collection('Questions').doc(question_id).delete()

// other APIs could come below
