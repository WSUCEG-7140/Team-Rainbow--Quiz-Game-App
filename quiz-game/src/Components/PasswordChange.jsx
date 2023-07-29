// Import necessary dependencies and components
import React, { Component } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

import { auth } from "../firebase";

// Helper function to update state properties
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

// Initial state for the component
const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
  showingAlert: false
};

// @ref R48_0

//This Component is part of the @ref Model within the overall @ref ModelViewController model.
//This Component implements the methods related to password changes by the user.

/**
 * PasswordChangeForm is a class component that contains a form to change the password.
 */
class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE };

  // Function to handle the form submission
  onSubmit = event => {
    event.preventDefault();
    const { passwordOne } = this.state;

    // Call the doPasswordChange method from the auth object provided by Firebase
    auth
      .doPasswordChange(passwordOne)
      .then(() => {
        // If the password change is successful, reset the form and show a success message
        this.setState({ ...INITIAL_STATE });
        console.log('Password Change Success!🎫 ')
      })
      .catch(error => {
        // If there's an error during password change, set the error in the state and show an alert message for a few seconds
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
    const { passwordOne, passwordTwo, error, showingAlert } = this.state;

    // Check if the form is invalid (passwords do not match or passwordOne is empty)
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div style={{ marginTop: "40px" }}>
        {/* Render the alert message if there's an error */}
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        {/* Password change form */}
        <Form>
          <FormGroup>
            <Label for="examplePassword1">New Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword1"
              placeholder="New Password"
              value={passwordOne}
              style={{ borderRadius: '20px', backgroundFilter: 'blur(5px)', color: 'white', background: '#e1ffe11a' }}
              onChange={e =>
                this.setState(byPropKey("passwordOne", e.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword2">Confirm Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword2"
              placeholder="Confirm Password"
              value={passwordTwo}
              style={{ borderRadius: '20px', backgroundFilter: 'blur(5px)', color: 'white', background: '#e1ffe11a' }}
              onChange={e =>
                this.setState(byPropKey("passwordTwo", e.target.value))
              }
            />
          </FormGroup>

          <div className="text-center">
            {/* Disable the button if the form is invalid */}
            <Button disabled={isInvalid} style={{ borderRadius: '15px' }} onClick={this.onSubmit}>
              Change My Password
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PasswordChangeForm;
