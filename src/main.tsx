import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { allPlanetsLoader, loader, planetLoader } from './API/loaders';
import App from './components/App';
import CardDetail from './components/CardDetail';
import CardList from './components/CardList';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';

const router = createBrowserRouter([
  {
    // path: '/',
    element: <App />,
    errorElement: <ErrorRoutPage />,
    // loader: allPlanetsLoader,
    children: [
      {
        path: '/',
        element: <CardList />,
        // loader: allPlanetsLoader,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          return loader(url.searchParams.get('q'), url.searchParams.get('page'));
        },
        children: [
          {
            path: ':planetId',
            element: <CardDetail />,
            loader: planetLoader,
          },
        ],
      },
      {
        path: 'planets/:planetId',
        element: <CardDetail />,
        loader: planetLoader,
      },

      {
        path: '/search',
        element: <CardList />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          return loader(url.searchParams.get('q'), url.searchParams.get('page'));
        },
        // children: [
        //   {
        //     path: 'planets/:planetId',
        //     element: <CardDetail />,
        //     loader: planetLoader,
        //   },
        // {
        //   path: 'page/:pageId',
        //   element: '',
        //   // children: [
        //   //   {
        //   //     path: 'planets/:planetId',
        //   //     element: <CardDetail />,
        //   //     loader: planetLoader,
        //   //   },
        //   // ],
        // },
        // ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
