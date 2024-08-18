import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('App Component', () => {
  it('displays an error message when server request fails', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(<App />);

    // Ensure the submit button exists
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    // Simulate user interaction to submit the form
    fireEvent.click(submitButton);

    // Check for error message
    expect(await screen.findByText(/Failed to fetch metadata. Please check the URLs and try again/i)).toBeInTheDocument();
  });
});
