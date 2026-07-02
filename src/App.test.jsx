import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Twiiiiter app', () => {
  it('renders the feed and the composer controls', () => {
    render(<App />);

    expect(screen.getAllByText(/For you/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/What is happening/i)).toBeInTheDocument();
  });

  it('opens the compose modal and publishes a new tweet', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /post/i })[0]);
    await user.type(screen.getByPlaceholderText(/What would you like to say/i), 'Testing the composer');
    await user.click(screen.getByRole('button', { name: /publish/i }));

    expect(screen.getByText(/Testing the composer/i)).toBeInTheDocument();
  });
});
