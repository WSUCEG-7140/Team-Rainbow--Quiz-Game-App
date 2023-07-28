import React from "react";
import { Button } from "reactstrap";

import { auth } from "../firebase";

// @ref R56_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to sign_out by the user.

const SignOutButton = () => (
  <Button color="info" onClick={auth.doSignOut} style={{borderRadius:'25px'}}>
    <text style={{fontSize:'17px'}} >Sign Out</text>
  </Button>
);

export default SignOutButton;