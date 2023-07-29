import React from "react";
import { db, firebase } from "../firebase";

import AuthUserContext from "./AuthUserContext"; //using provider's context api
// @ref R39_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to authentication of  the user.

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null
    };

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(authUser)
        db.doGetAnUnser(authUser.uid).then((res)=>{authUser['role']=res.data().role})
        
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
        
      });
    }

    render() {
      const { authUser } = this.state;
      console.log("withAuthentication file authUser", authUser);
      return (
        //   passing down the authUser value, so other components can consume it
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;