// Import the modules to be tested
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// Import the configuration and exports from the file
import { db, auth, facebookProvider, firebaseApp } from './firebase'; // Assuming this is the file path

// Mock the firebase modules
jest.mock('firebase/app', () => {
  return {
    __esModule: true,
    default: {
      apps: [],
      initializeApp: jest.fn(() => ({ name: 'MockApp' })),
      auth: jest.fn(),
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
            set: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
          })),
        })),
      })),
    },
  };
});

jest.mock('firebase/auth', () => {
  return {
    __esModule: true,
    default: {
      auth: jest.fn(),
      FacebookAuthProvider: jest.fn(),
    },
  };
});

describe('Firebase Configuration and Exports', () => {
  test('Firebase is initialized with the provided config', () => {
    expect(firebase.initializeApp).toHaveBeenCalledWith(config);
  });

  test('The "db" variable should be an instance of Firestore', () => {
    expect(db.collection).toBeDefined();
    expect(db.collection('users')).toBeDefined(); // You can use any collection name here
  });

  test('The "auth" variable should be an instance of Auth', () => {
    expect(auth.onAuthStateChanged).toBeDefined();
    // You can add more assertions for other Auth methods if needed
  });

  test('The "facebookProvider" variable should be an instance of FacebookAuthProvider', () => {
    expect(facebookProvider.addScope).toBeDefined();
    // You can add more assertions for other FacebookAuthProvider methods if needed
  });

  test('The "firebaseApp" variable should be an instance of the initialized Firebase app', () => {
    expect(firebaseApp.name).toBe('MockApp');
  });
});
