import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument

import E404 from './E404';

const customRender = (ui, options) => {
  return render(ui, { wrapper: MemoryRouter, ...options });
};

test('renders the Navbar', () => {
  customRender(<E404 />);
  const textElement = screen.getByText(/404 - Page not found/i);
  expect(textElement).toBeInTheDocument();
});