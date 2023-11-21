import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import CardDetail from './components/CardDetail';
import CardList from './components/CardList';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';
import { setupStore } from './store/store';

export const store = setupStore();

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorRoutPage />,
    // loader: searchLoader,
    children: [
      {
        errorElement: <ErrorRoutPage />,
        children: [
          {
            path: '/react-swapi?',
            element: <CardList />,
            children: [
              {
                path: 'planet/:planetId',
                element: <CardDetail />,
                // loader: planetLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
