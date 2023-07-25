import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument

import Navbar from './Navbar'

const customRender = (ui, options) => {
  return render(ui, { wrapper: MemoryRouter, ...options });
};

test('renders the Navbar', () => {
  customRender(<Navbar />);
  const textElement = screen.getByText(/Quiz App/i);
  expect(textElement).toBeInTheDocument();
});