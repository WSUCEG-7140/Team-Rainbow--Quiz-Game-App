import React from "react";

import AuthUserContext from "./AuthUserContext";
import PasswordChangeForm from "./PasswordChange";
import { PasswordForgetForm } from "./PasswordForget";
import withAuthorization from "./withAuthorization"; //redirects to sign in if user not signed in
/**
 * Account.jsx is the combination of components, PasswordChange.jsx and PasswordForget.jsx
 *  do same task as the name suggests making use of the appropriate functionality from auth.jsx.
 *  This is a protected route which can be accessed only by authenticated user.
 * @returns  a web page containing the components <PasswordForgetForm /> and <PasswordChangeForm />
 */

const AccountPage = () => (
  //authUser is passed down via Context API (It is set at withAuthentication.js file)
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="div-flex" style={{maxWidth:'750px',margin:'auto'}}>
        <div>
          <h5 className="centered">
            Change/Reset Password for : {authUser.email}
          </h5>
          {/* disabling password changes/resets if user is logged in through facebook */}
          {authUser.providerData[0].providerId === "facebook.com" ? null : (
            <div>
              <PasswordForgetForm />
              <PasswordChangeForm />
            </div>
          )}
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser =>
  !!authUser && authUser.providerData[0].providerId !== "facebook.com"; //true and false

export default withAuthorization(authCondition)(AccountPage);