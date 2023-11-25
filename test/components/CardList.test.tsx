import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/vitest';

import { fireEvent, screen } from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import CardList from '../../src/components/CardList';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  http.get('/api/user', async () => {
    await delay(150);
    return HttpResponse.json('John Smith');
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('fetches & receives a user after clicking the fetch user button', async () => {
  renderWithProviders(<CardList />);

  const testElem = document.body.querySelector('testElem');
  // const testElem = document.body.querySelector('testElem');
  console.log('🚀 ~ file: CardList.test.tsx:36 ~ test ~ testElem:', testElem);

  // should show no user initially, and not be fetching a user
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();

  // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  fireEvent.click(screen.getByRole('submit', { name: /search/i }));
  expect(screen.getByText(/throw/i)).toBeInTheDocument();

  // after some time, the user should be received
  expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/throw/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();
});
