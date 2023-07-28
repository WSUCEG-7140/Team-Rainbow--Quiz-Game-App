import React from 'react'
import './Navbar.css'
import Fade from 'react-reveal/Fade';
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import { auth } from '../firebase'
import AuthUserContext from "./AuthUserContext";

/**
 * NavigationNonAuth functionality
 * @returns JSX code that represents the navigation bar UI for non-authenticated users
 */
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


/**
 * 
 * NavigationAuth functionality
 * @param {*} param1: an object representing the user information that have property called role to indicate whther a user or faculty.
 * @returns JSX code that represents the navigation bar UI for authenticated users based on their role
 * 
 */
const NavigationAuth = ({ userInfo }) => (

  <div style={{ paddingTop: '15px' }}>
    {userInfo.role == 'faculty' ? (
      <Fade top>
      <div className='navbar-container'>
        <p>Quiz App 🚀 🚀  </p>
        <ul>
          <li><Link to={routes.FACULTY}>Home</Link></li>
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
/**
 * Navbar Component
 * @returns JSX code that represents the navigation bar UI for authenticated users based on their role
 */
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