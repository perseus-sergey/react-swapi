// import { ICardData } from '../../src/types';
// import React from 'react';
// import Card from './Card';
// import './CardList.css';
// import { CARD_PER_PAGE } from '../../src/commons/constants';
// import { Outlet, useSearchParams } from 'react-router-dom';
// import Pagination from './Pagination';
// import { Loader } from './UI/loader/Loader.test';
// import { useSearchQuery } from '../../src/store/api/api';
// import { getUrlParam } from '../../src/commons/utils';

// const CardList = () => {
//   const [searchParams] = useSearchParams();

//   const page = Number(searchParams.get('page')) || 1;

//   const { isLoading, data } = useSearchQuery({ text: getUrlParam('q'), page });

//   if (isLoading) return <Loader />;
//   return data && data.count && data.results[0].name ? (
//     <>
//       {data && data.count ? <h4>Results: {data.count}</h4> : ''}
//       <h1 className="h1-title">Planets List</h1>
//       <div className="content">
//         <section className="card-list">
//           <Pagination previousApiPage={data.previous} nextApiPage={data.next} />

//           <div className="cards-wrapper">
//             {data.results.map((card: ICardData, indx: number) => (
//               <Card index={indx + 1 + (page - 1) * CARD_PER_PAGE} key={card.name} cardData={card} />
//             ))}
//           </div>
//         </section>
//         <section className="card-detail">
//           <Outlet />
//         </section>
//       </div>
//     </>
//   ) : (
//     <h1 className="h1-title">Planets not found 👀 🤷</h1>
//   );
// };

// export default React.memo(CardList);

import React, { useState } from 'react';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/vitest';

import { fireEvent, screen } from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';
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

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('fetches & receives a user after clicking the fetch user button', async () => {
  renderWithProviders(<CardList />);

  // should show no user initially, and not be fetching a user
  expect(screen.getByText(/no user/i)).toBeInTheDocument();
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();

  // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }));
  expect(screen.getByText(/no user/i)).toBeInTheDocument();

  // after some time, the user should be received
  expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();
});

let mockSearchParam = '';

vi.mock('react-router-dom', () => ({
  ...vi.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

const Wrapper = () => {
  return (
    <MemoryRouter>
      <SampleComponent />
    </MemoryRouter>
  );
};

describe('SampleComponent', () => {
  it('should render component successfully', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});
