import React, { useState } from 'react';
import { StyledButton } from './UI/button/StyledButton.test';

const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  const throwErrorBtnHandler = () => {
    setIsError(true);
  };

  if (isError) throw new Error('This is a test error!\nError button was clicked.');

  return (
    <StyledButton buttonType="cancel" onClick={throwErrorBtnHandler}>
      Throw Error!
    </StyledButton>
  );
};

export default React.memo(ErrorButton);
