import React from "react";
import { Button } from "reactstrap";

import { auth } from "../firebase";

const SignOutButton = () => (
  <Button color="info" onClick={auth.doSignOut} style={{borderRadius:'25px'}}>
    <text style={{fontSize:'17px'}} >Sign Out</text>
  </Button>
);

export default SignOutButton;
