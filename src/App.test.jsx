import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = () => render(<MemoryRouter><App /></MemoryRouter>);

describe('Twiiiiter app', () => {
  it('renders the feed and the navigation links', () => {
    renderApp();

    expect(screen.getByText(/For you/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('signs up a user and publishes a new tweet', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: /sign in/i }));
    await user.click(screen.getByRole('button', { name: /create account/i }));
    await user.type(screen.getByLabelText(/full name/i), 'Ava');
    await user.type(screen.getByLabelText(/email/i), 'ava@example.com');
    await user.type(screen.getByLabelText(/^password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText(/welcome, ava/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /compose/i }));
    await user.type(screen.getByPlaceholderText(/write something smart/i), 'Testing the composer');
    await user.click(screen.getByRole('button', { name: /publish/i }));

    expect(screen.getByText(/Testing the composer/i)).toBeInTheDocument();
  });
});
