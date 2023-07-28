import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import SignUpPage from './SignUp';

const customRender = (ui, options) => {
    return render(ui, { wrapper: MemoryRouter, ...options });
  };

  test('renders the sign-up page', () => {
    customRender(<SignUpPage />);
  const headingElement = screen.getByText(/Sign Up/i);
  const userNameInput = screen.getByPlaceholderText('John Doe');
  const emailInput = screen.getByPlaceholderText('user@gmail.com');
  const password1Input = screen.getByPlaceholderText('Password');
  const password2Input = screen.getByPlaceholderText('Confirm Password');
  const signInButton = screen.getByTestId("sign_up");
  
  expect(headingElement).toBeInTheDocument();
  expect(userNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(password1Input).toBeInTheDocument();
  expect(password2Input).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
});

test('allows users to input email and password', () => {
    customRender(<SignUpPage />);
    const userNameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('user@gmail.com');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm Password');
    const signUpButton = screen.getByTestId("sign_up");
    
    fireEvent.change(userNameInput, { target: { value: 'Testing Username' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(password1Input, { target: { value: 'password123' } });
    fireEvent.change(password2Input, { target: { value: 'password123' } });


    expect(userNameInput.value).toBe("Testing Username")
    expect(emailInput.value).toBe('test@example.com');
    expect(password1Input.value).toBe('password123');
    expect(password2Input.value).toBe('password123');
}); 

test('Validating Sign-Up from (Password mismatch)', () => {
    customRender(<SignUpPage />);
    const userNameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('user@gmail.com');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm Password');
    const signUpButton = screen.getByTestId("sign_up");
    
    fireEvent.change(userNameInput, { target: { value: 'Testing Username' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(password1Input, { target: { value: 'password123' } });
    fireEvent.change(password2Input, { target: { value: 'password13' } });


    expect(userNameInput.value).toBe("Testing Username")
    expect(emailInput.value).toBe('test@example.com');
    expect(password1Input.value).toBe('password123');
    expect(password2Input.value).toBe('password13');

    // If we observe carefully - the passwords are mismatched,
    // so it does not allow user to click on sign-up button
    expect(signUpButton).toBeDisabled();
}); 

test('Trying to register an already existing user', async () => {
    customRender(<SignUpPage />);
    const userNameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('user@gmail.com');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm Password');
    const signUpButton = screen.getByTestId("sign_up");
    
    fireEvent.change(userNameInput, { target: { value: 'Testing Username' } });
    fireEvent.change(emailInput, { target: { value: 'bgk1884@gmail.com' } });
    fireEvent.change(password1Input, { target: { value: 'password123' } });
    fireEvent.change(password2Input, { target: { value: 'password123' } });

    fireEvent.click(signUpButton);
    
    await waitFor(()=>{
        const warning = screen.getByText(/^Warning:/i);
        expect(warning.textContent).toMatch(/^Warning:/i);
    })

}); 

test('Trying to register a new user, make sure we delete the user after test is done everytime!!', async () => {
    customRender(<SignUpPage />);
    const userNameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('user@gmail.com');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm Password');
    const signUpButton = screen.getByTestId("sign_up");
    
    fireEvent.change(userNameInput, { target: { value: 'Testing Username' } });
    fireEvent.change(emailInput, { target: { value: 'demo_user@gmail.com' } });
    fireEvent.change(password1Input, { target: { value: 'password123' } });
    fireEvent.change(password2Input, { target: { value: 'password123' } });

    fireEvent.click(signUpButton);
    
    customRender(<App />);
    await waitFor(()=>{
        const warning = screen.getByText(/^SignOut/i);
        expect(warning.textContent).toMatch(/^SignOut/i);
    })

}); 