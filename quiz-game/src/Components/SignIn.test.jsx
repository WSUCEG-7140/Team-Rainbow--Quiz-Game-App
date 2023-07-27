// src/components/SignIn.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignInPage from './SignIn';
import App from '../App'
import { MemoryRouter } from 'react-router-dom';



const customRender = (ui, options) => {
    return render(ui, { wrapper: MemoryRouter, ...options });
  };
  
//window.location.reload = vitest.fn();

test('renders the sign-in page', () => {
    customRender(<SignInPage />);
  const headingElement = screen.getByText(/Sign On/i);
  const emailInput = screen.getByPlaceholderText('user@gmail.com');
  const passwordInput = screen.getByPlaceholderText('pass-test');
  const signInButton = screen.getByText(/Sign In/i);

  expect(headingElement).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
});

test('allows users to input email and password', () => {
    customRender(<SignInPage />);
  const emailInput = screen.getByPlaceholderText('user@gmail.com');
  const passwordInput = screen.getByPlaceholderText('pass-test');
//   const x = screen.get

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
}); 

test('Checks signIn even with incorrect and invalid email and password', async () => {
    customRender(<SignInPage />);
  const emailInput = screen.getByPlaceholderText('user@gmail.com');
  const passwordInput = screen.getByPlaceholderText('pass-test');
  const signInButton = screen.getByText(/Sign In/i);
//   const x = screen.get

  fireEvent.change(emailInput, { target: { value: 'jiljiljiga188@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'gowrav14' } });

  expect(emailInput.value).toBe('jiljiljiga188@gmail.com');
  expect(passwordInput.value).toBe('gowrav14');

  fireEvent.click(signInButton);
  await waitFor(() => {
    const warning = screen.getByText(/^Warning:/i);
  expect(warning.textContent).toMatch(/^Warning:/i);
   })
  
});

test('Checks signIn with Correct and valid email and password', async () => {
    customRender(<SignInPage />);
  const emailInput = screen.getByPlaceholderText('user@gmail.com');
  const passwordInput = screen.getByPlaceholderText('pass-test');
  const signInButton = screen.getByText(/Sign In/i);
//   const x = screen.get

  fireEvent.change(emailInput, { target: { value: 'bgk1884@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'gowrav143' } });

  expect(emailInput.value).toBe('bgk1884@gmail.com');
  expect(passwordInput.value).toBe('gowrav143');

  fireEvent.click(signInButton);
  customRender(<App />);
  await waitFor(() => {
    const warning = screen.getByText(/^SignOut/i);
    expect(warning.textContent).toMatch(/^SignOut/i);
   });
  
}); 