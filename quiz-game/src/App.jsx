import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route } from "react-router-dom"
import * as routes from "./constants/routes"
import HomePage from './Components/Student/Home'
import Quiz from './Components/Student/Quiz'
import AccountPage from './Components/Account'


function App() {
  return (
      <BrowserRouter>
      <div className='app' >
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
      <Route exact path={routes.QUIZ+':id'} component={Quiz} />
      </div>
  </BrowserRouter> 
  )
}

export default withAuthentication(App);
