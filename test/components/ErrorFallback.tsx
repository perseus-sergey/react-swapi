import React, { MouseEventHandler } from 'react';
import { useRouteError } from 'react-router-dom';
import { StyledButton } from './UI/button/StyledButton.test';

interface IRoutError {
  data: string;
  error: string;
  internal: boolean;
  status: number;
  statusText: string;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: MouseEventHandler<HTMLButtonElement>;
}) => {
  console.error(error.message);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <StyledButton style={{ margin: '0 auto' }} buttonType="cancel" onClick={resetErrorBoundary}>
        Return
      </StyledButton>
    </div>
  );
};

export const ErrorRoutPage = React.memo(() => {
  const error = useRouteError() as IRoutError;
  // const location = useLocation();
  const location = { pathname: 'Wrong Path!' };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error.status === 404 && (
        <>
          <h2>{error.status}</h2>{' '}
          <p>
            Resource not found at the path <strong>{location.pathname}</strong>
          </p>
        </>
      )}

      <p>
        <i>{error.statusText || error.data}</i>
      </p>
    </div>
  );
});

export default React.memo(ErrorFallback);
