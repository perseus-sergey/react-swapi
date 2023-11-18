import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { planetLoader, searchLoader } from './API/loaders';
import App from './components/App';
import CardDetail from './components/CardDetail';
import CardList from './components/CardList';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';
import store from './store';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorRoutPage />,
    children: [
      {
        errorElement: <ErrorRoutPage />,
        children: [
          {
            path: '/react-swapi?',
            element: <CardList />,
            loader: searchLoader,
            children: [
              {
                path: 'planet/:planetId',
                element: <CardDetail />,
                loader: planetLoader,
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
