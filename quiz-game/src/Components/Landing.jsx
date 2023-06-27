import React from 'react'
import './Landing.css'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

function LandingPage() {
    return (
        <div className='landing-container' >
            This is just a sample alnding page that can be accessed without authenctication as well
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