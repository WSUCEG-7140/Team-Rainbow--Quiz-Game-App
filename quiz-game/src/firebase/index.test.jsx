// Import the modules to be tested
import * as authModule from './auth';
import * as dbModule from './db';
import * as firebaseModule from './firebase';

// Mock the auth module
jest.mock('./auth', () => ({
  doCreateUserWithEmailAndPassword: jest.fn(),
  doSignInWithEmailAndPassword: jest.fn(),
  doSignOut: jest.fn(),
  // Add other auth functions as needed
}));

// Mock the db module
jest.mock('./db', () => ({
  allQuizes: jest.fn(),
  getQuizQuestions: jest.fn(),
  doCreateUser: jest.fn(),
  // Add other db functions as needed
}));

// Mock the firebase module
jest.mock('./firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    // Add other auth functions as needed
  },
  db: {
    allQuizes: jest.fn(),
    getQuizQuestions: jest.fn(),
    doCreateUser: jest.fn(),
    // Add other db functions as needed
  },
  // Add other firebase functions as needed
}));

describe('Exported Modules', () => {
  test('auth module exports should reference functions from the auth module', () => {
    expect(authModule.doCreateUserWithEmailAndPassword).toBeInstanceOf(Function);
    expect(authModule.doSignInWithEmailAndPassword).toBeInstanceOf(Function);
    expect(authModule.doSignOut).toBeInstanceOf(Function);
    // Add other auth functions as needed
  });

  test('db module exports should reference functions from the db module', () => {
    expect(dbModule.allQuizes).toBeInstanceOf(Function);
    expect(dbModule.getQuizQuestions).toBeInstanceOf(Function);
    expect(dbModule.doCreateUser).toBeInstanceOf(Function);
    // Add other db functions as needed
  });

  test('firebase module exports should reference functions from the firebase module', () => {
    expect(firebaseModule.auth.createUserWithEmailAndPassword).toBeInstanceOf(Function);
    expect(firebaseModule.auth.signInWithEmailAndPassword).toBeInstanceOf(Function);
    expect(firebaseModule.auth.signOut).toBeInstanceOf(Function);
    // Add other auth functions from firebase as needed

    expect(firebaseModule.db.allQuizes).toBeInstanceOf(Function);
    expect(firebaseModule.db.getQuizQuestions).toBeInstanceOf(Function);
    expect(firebaseModule.db.doCreateUser).toBeInstanceOf(Function);
    // Add other db functions from firebase as needed
  });
});
