# Design

This design documents shows how the Rainbow-Team's Quiz game App project implements the following @ref Requirements.

@section Project Project Overview

Quiz game App developed using React vite and firebase. This system helps allow users to practice quizes.

# Features
1.	Authentication: Allows user to sign up sign in and sign out.
2.	Quiz practice: allows users to access list of quizzes to practice that are made available by the admin.
3.	Admin : Allows to add, edit, delete and disable quizzes.
4.	Reporting: displays results after completion of each quiz.

@section ModelViewController Model View Controller

This design applies the [Model View Controller](https://en.wikipedia.org/wiki/Model–view–controller) Design Pattern.

## Model

The Model consists of the following components:

@anchor R33_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Student/Question.jsx
@anchor R33_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Student/Quiz.jsx
@anchor R33_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Student/Quiz.jsx

## View
<br>
<br>

## Controller

The Controller consists of the following component:

@anchor R54_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Faculty/FacultyHome.jsx
@anchor R22_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Faculty/EditQuiz.jsx
@anchor R80_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Faculty/AddQuiz.jsx
@anchor R86_0 https://github.com/WSUCEG-7140/Team-Rainbow--Quiz-Game-App/blob/main/quiz-game/src/Components/Faculty/FacultyHome.jsx


## App.jsx
The main container with the DOM defined as per authorizations/authentications.
It imports all the routes from ROUTES.JSX and maps them with appropriate components to be rendered when the user is navigated to a particular route inside DOM.

## Firebase:
      # Firebase.jsx:
This file holds all the information about our creds used to establish connections to the database or the authentication services provided by firebase.
We mainly have 2 service that we mostly use from firebase in our app:
1.     Authentication
2.     Firestore Cloud Database
 
 
    ##  auth.jsx:
As discussed before this file is used to make all kinds of request related to authentication and deauth of a user. We have written functions like:
1.     doCreateUserWithEmailAndPassword: This function creates a new user by taking username, email and password as input parameters and returning the newly created user object to the place of call. Essentially used while signing up a new user
 
2.     doSignInWithEmailAndPassword: This function validates a user by accepting email and password as input parameters and returns user object if validation is successful otherwise returns the error received while validating. This is essentially used for user signin
 
3.     doSignOut: This function is used to terminate the current user session and deauthenticate the user.
 
4.     doPasswordReset: It takes user email as input and makes a request to the firebase authentication system to send a password reset mail if the user record exists with the provided email.
 
5.     doEmailVerification: This function is used to verify users email address using firebase email verification system. To make use of this function first we need an authenticated user since it makes request email verification with the current user object
 
6.     doPasswordChange: As the name suggests it is used to change the user’s password from the account section in the UI.
 
  ##   db.jsx:
 
This file contains all the functions that our project uses to obtain/update any data in our firestore cloud storage in firebase. Let’s over the functions now:
 
1.     doCreateuser: creates a user object to store essential information like how many quizzes did the user take and what is the maximum score obtained and past quiz attempts.
 
2.     doGetAnUser: gets user information that is stored in DB as explained in doCreateUser function.
 
 
3.     doGetUserQuizAttempts: Helps get all the quizzes data and scores that user had attempted in the past.
 
4.     allQuizes: Lists all the quizzes hosted by faculty in the DB.
 
5.     getQuizQuestions: Takes quiz-id as input and gets all the questions, options, and answers from the DB.
 
6.     doQuizStatusUpdate: Used to update the status of the user's current attempt of the quiz – it usually had 2 states: pending and completed.
 
7.     doCreateQuiz: Creates a new quiz object in DB by taking name as input and preparing some default values to be in place.
 
8.     doTotalQuizesData: This is a reference to the Quizes collection in firebase cloud storage; This can be used to make any required calls to DB if in case any functions fail to execute.
 
9.     doDelteQuiz: Takes quiz-id as input and deletes that quiz record from the DB.
 
10.  doGetQuizAttemps: This takes quiz-id as input and gets data of users who have attempted a particular quiz.
 
11.  doQuizStatus_Enable_Disable: This takes quiz-is and status variable as input to update the status of quiz, i.e if it should be enabled or disabled.
 
12.  doUpdateQuizQuestions: Takes quiz-id, question-id and question data (question, options and answer) as input and updates that particular question in the given quiz with the new data passed as input.
 
13.  doNewQuizQuestions: Takes quiz-id and question data (question, options and answer) as input and creates a new question in the given quiz with the new data passed as input.
 
14.  doDeleteQuestion: Takes quiz-id and question-id as input and deletes that particular question from the quiz in the record of the DB.
 
 
 
## Navbar.jsx: This component is rendered as the navigation bar that helps user to navigate different parts of the app. We have 3 different states of navbar:
1.     Non-Auth Navbar – shown when user is not authenticated.
2.     Student Navbar – shown when student is signed in.
3.     Faculty Navbar – Shown when faculty is signed in.

## Landing.jsx: This is just a sample homepage that can be accessed with/without authentication.

## Signin.jsx: This component enables the user to enter email and password for the signin and it also have links to forgot password and signup page. This particular page makes use of the function “doSignInWithEmailAndPassword” for authenticating user.

## SignUp.jsx: This component enables the user to enter display Name, email, password and confirm password for the signup and it also have links signin page. This particular page makes use of the function “doCreateUserWithEmailAndPassword” from auth and “doCreateuser” from db for creating new user.

## Account.jsx is the combination of components, PasswordChange.jsx and PasswordForget.jsx do same task as the name suggests making use of the appropriate functionality from auth.jsx. This is a protected route which can be accessed only by authenticated user.

## E404.jsx: It is the Error 404 page that is rendered when user tries to enter a non-essential/ unassigned route on the DOM of our app.
 
From here we have 2 different UIs we have designed for: student and faculty – a user cannot access these pages without authentication as these pages are authenticated

## Student:

#1.     Home: This page has all the user information like Name, Course name, Program Name, Total Quizzes, Highest Score gained among all the quizzes. It also has an Active Quizzes which has quizzes that are active and inactive quizzes. Active Quiz display an option to Quiz Title, max marks of the quiz and Take Quiz button which redirects user to other page with the relevant quiz where disabled quiz has this button disabled making user unable to click it.
#2.     Quiz: This Quiz is not a directly invoked page, this page is redirected only from the student dashboard with the required props and unique Quiz ID.
 
 
## Faculty:

#1.     Home: Faculty home is the toughest and most complex part of this project. This is combination of many different modules together.
a.      All Quizzes: This section displays all the quizzes that are already created, and it gives an option for new quizzes as well.
                                                    i. 	Create Quiz
                                                  ii. 	Edit Quiz
                                                iii. 	Delete Quiz
b.     Create Quiz – It can be used to create a new quiz.
c.  Edit Quiz – It opens up in a pop displaying all the questions that are available in the Quiz and gives an option to edit them/ add a new question as well
d.  ResultsGraph - this component renders a area line graph to indicate the scores that students scored in the particular quiz 
		Ex: Quiz -1: point : Number of Students
					0	0
1	5
					2	4
					3	1
