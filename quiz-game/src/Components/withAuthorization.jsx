import React from "react";
import { withRouter } from "react-router-dom";

import * as routes from "../constants/routes";
import { firebase } from "../firebase";
import AuthUserContext from "./AuthUserContext";
// @ref R35_0 , R39_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to authorization of the user.

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          //if the authorization fails, redirects to sign in page
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {/* it either renders the passed component or not */}
          {authUser =>
            authUser ? (
              <Component {...this.props} loggedUser={authUser} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization); //using withRouter so we have access to history props
};

export default withAuthorization;