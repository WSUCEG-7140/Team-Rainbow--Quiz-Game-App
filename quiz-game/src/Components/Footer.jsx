import React from 'react'
import './Footer.css'
import { Fade } from 'react-reveal'
/**
 * It is important to mention the year of development and copy right to keep the sodtware transperant
 * @returns Displays copyrights as JSX component
 */
function Footer() {
  return (
    <Fade bottom>
    <div className='footer'>
       2023 Developed by XXXX © 
    </div>
    </Fade>
  )
}

export default Footer