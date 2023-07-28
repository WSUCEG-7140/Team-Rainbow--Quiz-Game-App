import React from 'react'
import { Zoom } from 'react-reveal'
import Flash from 'react-reveal/Flash'
import { Link } from 'react-router-dom'
import './E404.css'

// @ref R33_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to displaying an message to the user.


/**
 * E404 Component: Displaying error message if exceptions are encountered
 * @returns JSX code that represents the custom 404 error page
 * 
 */
function E404() {
  return (
    <Zoom>
    <Flash duration={2000} delay={1000} >
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to="/">Go To Homepage</Link>
		</div>
	</div>
    </Flash>
    </Zoom>
  )
}

export default E404