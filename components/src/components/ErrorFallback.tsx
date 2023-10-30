import React, { MouseEventHandler } from 'react';
import { StyledButton } from './UI/button/StyledButton';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <StyledButton style={{ margin: '0 auto' }} buttonType="cancel" onClick={resetErrorBoundary}>
      Return
    </StyledButton>
  </div>
);

export default React.memo(ErrorFallback);
