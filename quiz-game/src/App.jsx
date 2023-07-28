import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./constants/routes";
import withAuthentication from "./Components/withAuthentication";
import AuthUserContext from "./Components/AuthUserContext";
import SignInPage from './Components/SignIn'
import SignUpPage from './Components/SignUp'
import HomePage from './Components/Student/Home'
import AccountPage from './Components/Account'
import PasswordForgetPage from './Components/PasswordForget'
import LandingPage from './Components/Landing'
import Quiz from './Components/Student/Quiz'
import FacultyHome from './Components/Faculty/FacultyHome'
import E404 from './Components/E404'
import AddQuiz from './Components/Faculty/AddQuiz'

function App() {
  return (
    <BrowserRouter>
      <div className='app' >
        <Navbar />
        <Switch>
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.HOME} component={HomePage} />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={routes.QUIZ + ':id'} component={Quiz} />
          <Route exact path={routes.FACULTY} component={FacultyHome} />
          <Route exact path={routes.ADD_QUIZ} component={AddQuiz} />
          <Route path ="/*" component={E404} />
          
        </Switch>
        <Footer />
      </div>

    </BrowserRouter>
  )
}

export default withAuthentication(App);