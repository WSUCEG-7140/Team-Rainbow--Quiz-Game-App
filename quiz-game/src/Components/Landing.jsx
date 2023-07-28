import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import './Landing.css';

// @ref R45_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to effective landing page.

/**
 * Landing page is the Home page that occurs before the user login
 * @returns displays simple interface of quiz react app
 * 
 */
function LandingPage() {
    return (
        <div className='landing-container' >
            This is just a sample landing page that can be accessed without authentication as well
            <Zoom>
                <div className='ex cont1' >
                    <p className='txt-int'>This is a testing text!!</p>
                </div></Zoom>
            <div className='grp-ex' >
                <Fade left >
                    <div className='ex cont2' >
                        <p className='txt-int'>This is a testing text!!</p>
                    </div>
                </Fade>
                <Fade right>
                    <div className='ex cont3' >
                        <p className='txt-int'>This is a testing text!!</p>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default LandingPage