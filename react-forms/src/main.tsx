import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';
import Home from './pages/home';

// export const store = setupStore();

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
            element: <Home />,
            // element: <CardList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
