import React from 'react'
import './Navbar.css'
import Fade from 'react-reveal/Fade';
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import { auth } from '../firebase'
import AuthUserContext from "./AuthUserContext";


const NavigationNonAuth = () => (
  <Fade top>
    <div className='navbar-container'>
      <p>Quiz App 🚀 🚀  </p>
      <ul>
        <li><Link to={routes.LANDING}>Home</Link></li>
        <li>About</li>
        <li><Link to={routes.SIGN_IN}><button><text style={{ marginLeft: '15px', marginRight: '15px' }}>SignOn</text></button></Link></li>
      </ul>
    </div>
  </Fade>
);

const NavigationAuth = ({ userInfo }) => (

  <div style={{ paddingTop: '15px' }}>
    {userInfo.role == 'faculty' ? (
      <Fade top>
      <div className='navbar-container'>
        <p>Quiz App 🚀 🚀  </p>
        <ul>
          <li><Link to={routes.HOME}>Home</Link></li>
          <li><Link to={routes.ACCOUNT}>Account</Link></li>
          <li><button onClick={auth.doSignOut} style={{background:'red'}}><text style={{ marginLeft: '15px', marginRight: '15px' }}>SignOut</text></button></li>
        </ul>
      </div>
    </Fade>
    ) : (
      <Fade top>
    <div className='navbar-container'>
      <p>Quiz App 🚀 🚀  </p>
      <ul>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><button onClick={auth.doSignOut} style={{background:'red'}}><text style={{ marginLeft: '15px', marginRight: '15px' }}>SignOut</text></button></li>
      </ul>
    </div>
  </Fade>
    )
    }

  </div>
);

const Navbar = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser !== null ?
        <NavigationAuth userInfo={authUser} />
        : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

export default Navbar
