import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { planetLoader } from './API/loaders';
import App from './components/App';
import CardDetail from './components/CardDetail';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorRoutPage />,
    children: [
      {
        path: 'planets/:planetId',
        element: <CardDetail />,
        loader: planetLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
