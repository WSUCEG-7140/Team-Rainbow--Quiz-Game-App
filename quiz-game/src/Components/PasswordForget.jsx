// Import necessary dependencies and components
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { auth } from "../firebase";
import * as routes from "../constants/routes";


/** PasswordForgetPage component allows users to reset their password, whether they are authenticated or not. It renders a form to request a password reset. */
const PasswordForgetPage = () => (
  <div className="div-flex" style={{maxWidth:'750px',margin:'auto'}}>
    <div>
      <h1 className="centered">Forget Password</h1>
      <PasswordForgetForm />
    </div>
  </div>
);

// Helper function to update state properties
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

// Initial state for the PasswordForgetForm component
const INITIAL_STATE = {
  email: "",
  error: null,
  showingAlert: false
};

// PasswordForgetForm component allows users to enter their email and request a password reset.
class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE };

  // Function to handle the form submission
  onSubmit = event => {
    event.preventDefault();
    const { email } = this.state;

    // Call the doPasswordReset method from Firebase's auth object to request a password reset
    auth
      .doPasswordReset(email)
      .then(() => {
        // If the password reset request is successful, reset the form
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        // If there's an error during the password reset request, set the error in the state and show an alert message for a few seconds
        this.setState(byPropKey("error", error));
        this.timer();
      });
  };

  // Function to show the alert message for a few seconds
  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 4000);
  };

  render() {
    // Destructure state properties for easy access
    const { email, error, showingAlert } = this.state;

    // Check if the email is empty, which is used to disable the submit button
    const isInvalid = email === "";

    return (
      <div>
        {/* Render the alert message if there's an error */}
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        {/* Password forget form */}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              style={{borderRadius:'20px',backgroundFilter:'blur(5px)',color:'white',background:'#e1ffe11a'}}
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>

          <div className="text-center">
            {/* Disable the button if the email is empty */}
            <Button disabled={isInvalid} style={{borderRadius:'15px'}} type="submit">
              Reset My Password
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

// PasswordForgetLink component provides a link to the password forget page.
const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
