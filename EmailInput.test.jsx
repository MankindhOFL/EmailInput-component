import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailInput from './EmailInput';

jest.mock('@supabase/supabase-js', () => {
  const insertMock = jest.fn().mockResolvedValue({ data: {}, error: null });
  return {
    createClient: jest.fn(() => ({
      from: jest.fn(() => ({
        insert: insertMock,
      })),
    })),
  };
});

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

describe('EmailInput Component', () => {
  test('renders the email input field and submit button', () => {
    render(<EmailInput />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows an error message for invalid email', async () => {
    render(<EmailInput />);
    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    // Use waitFor to handle asynchronous state updates
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Please enter a valid email address'))).toBeInTheDocument();
    });
  });

  test('clears the input and does not show an error for valid email', async () => {
    render(<EmailInput />);
    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText('Email successfully submitted!')).toBeInTheDocument();
    });

    // Check that the input value is cleared
    expect(input.value).toBe('');
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
  });
});