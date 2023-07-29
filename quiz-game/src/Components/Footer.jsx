import React from 'react'
import { Fade } from 'react-reveal'
import './Footer.css'

// @ref R81_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to  basic component for entire web page.

/**
 * It is important to mention the year of development and copy right to keep the sodtware transperant
 * @returns Displays copyrights as JSX component
 */
function Footer() {
  return (
    <Fade bottom>
    <div className='footer'>
       2023 Developed by Team_Rainbow © 
    </div>
    </Fade>
  )
}

export default Footer