import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument

import Footer from './Footer';

test('renders the Footer', () => {
  render(<Footer />);
  const textElement = screen.getByText(/2023 Developed by XXXX ©/i);
  expect(textElement).toBeInTheDocument();
});