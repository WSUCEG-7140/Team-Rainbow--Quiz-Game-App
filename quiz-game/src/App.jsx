import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route , Switch } from "react-router-dom"
import * as routes from "./constants/routes"
import SignInPage from './Components/SignIn'
import SignUpPage from './Components/SignUp'
import HomePage from './Components/Student/Home'
import Quiz from './Components/Student/Quiz'
import AccountPage from './Components/Account'
import LandingPage from './Components/Landing'
import PasswordForgetPage from './Components/PasswordForget'
import LandingPage from './Components/Landing'

function App() {
  return (
      <BrowserRouter>
      <div className='app' >
      <Navbar />
      <Route exact path={routes.LANDING} component={LandingPage}/>
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={routes.QUIZ+':id'} component={Quiz} />

      
        </div>
  </BrowserRouter> 
  )
}

export default withAuthentication(App);
