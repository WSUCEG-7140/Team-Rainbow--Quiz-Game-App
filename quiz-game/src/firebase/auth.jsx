import { auth } from "./firebase"; //importing the previously instatiated object from the firebase.js config file
//## below the authentication functions ##

//sign up
export const doCreateUserWithEmailAndPassword = (email, password,displayName) =>
  auth.createUserWithEmailAndPassword(email, password).then((authUser)=>{
    authUser.user.updateProfile({
      displayName: displayName
    });
    return authUser
  });

//sign in
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//sign out
export const doSignOut = () => auth.signOut();

//password reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

//Email Verification
export const doEmailVerification = user => auth.currentUser.sendEmailVerification();
  
//password change
export const doPasswordChange = password =>
  auth.currentUser.updatePassword(password);

