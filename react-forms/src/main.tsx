import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ErrorRoutPage } from './components/ErrorFallback';
import './index.css';
import Form from './pages/Form';
import FormRef from './pages/FormRef';
import Home from './pages/Home';
import { setupStore } from './store/store';

export const store = setupStore();

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
          },
          {
            path: '/form',
            element: <Form />,
          },
          {
            path: '/form-uncontrolled',
            element: <FormRef />,
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
