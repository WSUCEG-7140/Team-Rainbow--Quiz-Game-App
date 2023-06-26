import { BrowserRouter, Route } from "react-router-dom"
import './App.css'
import HomePage from './Components/Student/Home'
import Quiz from './Components/Student/Quiz'
import * as routes from "./constants/routes"

function App() {
  return (
      <BrowserRouter>
      <div className='app' >
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.QUIZ+':id'} component={Quiz} />
      </div>
  </BrowserRouter> 
  )
}

export default withAuthentication(App);
