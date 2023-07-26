import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { auth } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
  showingAlert: false
};

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { passwordOne } = this.state;
    auth
      .doPasswordChange(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log('Password Change Success!🎫 ')
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        this.timer(); //show alert message for some seconds
      });

    event.preventDefault();
  };

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
    const { passwordOne, passwordTwo, error, showingAlert } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div style={{ marginTop: "40px" }}>
        {showingAlert && (
          <Alert color="danger" onLoad={this.timer}>
            {error.message}
          </Alert>
        )}

        <Form >
          <FormGroup>
            <Label for="examplePassword1">New Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword1"
              placeholder="New Password"
              value={passwordOne}
              style={{borderRadius:'20px',backgroundFilter:'blur(5px)',color:'white',background:'#e1ffe11a'}}
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
              style={{borderRadius:'20px',backgroundFilter:'blur(5px)',color:'white',background:'#e1ffe11a'}}
              onChange={e =>
                this.setState(byPropKey("passwordTwo", e.target.value))
              }
            />
          </FormGroup>

          <div className="text-center">
            <Button disabled={isInvalid} style={{borderRadius:'15px'}} onClick={this.onSubmit}>
              Change My Password
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PasswordChangeForm;

// <form onSubmit={this.onSubmit}>
//   <input
//     value={passwordOne}
//     onChange={event =>
//       this.setState(byPropKey("passwordOne", event.target.value))
//     }
//     type="password"
//     placeholder="New Password"
//   />
//   <input
//     value={passwordTwo}
//     onChange={event =>
//       this.setState(byPropKey("passwordTwo", event.target.value))
//     }
//     type="password"
//     placeholder="Confirm New Password"
//   />
//   <button disabled={isInvalid} type="submit">
//     Change My Password
//   </button>

//   {error && <p>{error.message}</p>}
// </form>