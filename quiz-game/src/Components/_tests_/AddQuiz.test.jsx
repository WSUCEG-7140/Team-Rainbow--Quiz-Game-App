import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

// Import the component to be tested
import AddQuiz from './AddQuiz';

// Mock the firebase module
jest.mock('../../firebase', () => ({
  db: {
    doCreateQuiz: jest.fn(() => Promise.resolve()),
  },
}));

describe('AddQuiz Component', () => {
  it('should render input and button', () => {
    const { getByPlaceholderText, getByText } = render(<AddQuiz />);
    const inputElement = getByPlaceholderText('Quiz Title');
    const buttonElement = getByText('Create Quiz');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should enable the button when the input has text', () => {
    const { getByPlaceholderText, getByText } = render(<AddQuiz />);
    const inputElement = getByPlaceholderText('Quiz Title');
    const buttonElement = getByText('Create Quiz');

    expect(buttonElement).toBeDisabled();

    // Type some text into the input
    fireEvent.change(inputElement, { target: { value: 'My Quiz' } });

    expect(buttonElement).not.toBeDisabled();
  });

  it('should call createQuiz function when the button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<AddQuiz />);
    const inputElement = getByPlaceholderText('Quiz Title');
    const buttonElement = getByText('Create Quiz');

    // Type some text into the input
    fireEvent.change(inputElement, { target: { value: 'My Quiz' } });

    // Mock the setIsOpen function
    const setIsOpen = jest.fn();
    const props = { setIsOpen };
    // Re-render the component with the mock setIsOpen prop
    render(<AddQuiz {...props} />);

    // Click the button
    fireEvent.click(buttonElement);

    // Expect the doCreateQuiz function to have been called with the correct title
    expect(db.doCreateQuiz).toHaveBeenCalledWith('My Quiz');

    // Expect setIsOpen to have been called with false
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
