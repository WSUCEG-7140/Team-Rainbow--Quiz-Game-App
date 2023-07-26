// auth.test.js
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For adding custom Jest matchers
import * as firebaseModule from './firebase'; // Replace this path with the actual path to your firebase.js file
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doEmailVerification,
  doPasswordChange,
} from './auth'; // Assuming the functions are exported from the 'auth.js' file

// Create a mock for the firebase.auth methods
jest.mock('./firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn(),
      updatePassword: jest.fn(),
    },
  },
}));

describe('Authentication Functions', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('doCreateUserWithEmailAndPassword should create a user and update display name', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const displayName = 'Test User';

    const mockUser = {
      user: {
        updateProfile: jest.fn(),
      },
    };

    // Mock the behavior of createUserWithEmailAndPassword
    firebaseModule.auth.createUserWithEmailAndPassword.mockResolvedValueOnce(mockUser);

    // Call the authentication function
    const authUser = await doCreateUserWithEmailAndPassword(email, password, displayName);

    // Assertions
    expect(firebaseModule.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(mockUser.user.updateProfile).toHaveBeenCalledWith({ displayName });
    expect(authUser).toBe(mockUser);
  });

  test('doSignInWithEmailAndPassword should sign in the user', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    const mockUserCredential = {
      user: {
        email: 'test@example.com',
      },
    };

    // Mock the behavior of signInWithEmailAndPassword
    firebaseModule.auth.signInWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);

    // Call the authentication function
    const userCredential = await doSignInWithEmailAndPassword(email, password);

    // Assertions
    expect(firebaseModule.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(userCredential).toBe(mockUserCredential);
  });

  test('doSignOut should sign out the user', async () => {
    // Mock the behavior of signOut
    firebaseModule.auth.signOut.mockResolvedValueOnce();

    // Call the authentication function
    await doSignOut();

    // Assertion
    expect(firebaseModule.auth.signOut).toHaveBeenCalled();
  });

  test('doPasswordReset should send a password reset email', async () => {
    const email = 'test@example.com';

    // Mock the behavior of sendPasswordResetEmail
    firebaseModule.auth.sendPasswordResetEmail.mockResolvedValueOnce();

    // Call the authentication function
    await doPasswordReset(email);

    // Assertion
    expect(firebaseModule.auth.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });

  test('doEmailVerification should send an email verification email', async () => {
    const mockUser = {
      sendEmailVerification: jest.fn(),
    };

    // Mock the behavior of currentUser
    firebaseModule.auth.currentUser = mockUser;

    // Call the authentication function
    await doEmailVerification();

    // Assertion
    expect(mockUser.sendEmailVerification).toHaveBeenCalled();
  });

  test('doPasswordChange should update the user password', async () => {
    const password = 'newtestpassword';

    // Mock the behavior of updatePassword
    firebaseModule.auth.currentUser.updatePassword.mockResolvedValueOnce();

    // Call the authentication function
    await doPasswordChange(password);

    // Assertion
    expect(firebaseModule.auth.currentUser.updatePassword).toHaveBeenCalledWith(password);
  });
});
