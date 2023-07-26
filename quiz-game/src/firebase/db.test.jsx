// Import the database functions to be tested
import {
  allQuizes,
  getQuizQuestions,
  doCreateUser,
  doGetAnUnser,
  doGetUserQuizAttempts,
  doQuizStatusUpdate,
} from './firebase'; // Assuming the functions are exported from the 'firebase.js' file

// Create a mock for the firebase.firestore methods
jest.mock('./firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve([])),
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
        collection: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve([])),
        })),
      })),
    })),
  },
}));

describe('Firebase Realtime Database API', () => {
  test('allQuizes should return all quizes', async () => {
    const quizes = await allQuizes();
    expect(quizes).toEqual([]);
    expect(db.collection).toHaveBeenCalledWith('Quizes');
    expect(db.collection('Quizes').get).toHaveBeenCalled();
  });

  test('getQuizQuestions should return questions of a particular quiz using quiz ID', async () => {
    const quizId = 'quiz123';
    const questions = await getQuizQuestions(quizId);
    expect(questions).toEqual([]);
    expect(db.collection).toHaveBeenCalledWith('Quizes');
    expect(db.collection('Quizes').doc).toHaveBeenCalledWith(quizId);
    expect(db.collection('Quizes').doc(quizId).collection).toHaveBeenCalledWith('Questions');
    expect(db.collection('Quizes').doc(quizId).collection('Questions').get).toHaveBeenCalled();
  });

  test('doCreateUser should create a user', async () => {
    const userId = 'user123';
    const username = 'John Doe';
    const email = 'john.doe@example.com';

    // Mock the behavior of set function
    db.collection('users').doc.mockReturnValue({
      set: jest.fn(() => Promise.resolve()),
    });

    await doCreateUser(userId, username, email);

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(db.collection('users').doc).toHaveBeenCalledWith(userId);
    expect(db.collection('users').doc(userId).set).toHaveBeenCalledWith({
      username,
      email,
      verified: false,
      h_score: 0,
      t_quizes: 0,
    });
  });

  test('doGetAnUnser should get a user using UID', async () => {
    const userId = 'user123';

    // Mock the behavior of get function
    db.collection('users').doc.mockReturnValue({
      get: jest.fn(() => Promise.resolve({ data: () => ({}) })),
    });

    const user = await doGetAnUnser(userId);

    expect(db.collection).toHaveBeenCalledWith('users');
    expect(db.collection('users').doc).toHaveBeenCalledWith(userId);
    expect(db.collection('users').doc(userId).get).toHaveBeenCalled();
    expect(user).toEqual({});
  });

  // Add tests for other functions as needed
});
