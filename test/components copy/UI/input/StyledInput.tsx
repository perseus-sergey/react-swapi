import React from 'react';
import { InputProps } from '../../../../src/types';
import classes from './StyledInput.module.css';

const StyledInp = ({ badMessage, isWrang, ...props }: InputProps) => {
  const wrongStyles = [classes.errorMessage];
  if (isWrang) wrongStyles.push(classes.active);

  const inputStyles = [classes.styledInput];
  if (isWrang) inputStyles.push(classes.wrong);

  return (
    <>
      <div role="alert" className={wrongStyles.join(' ')}>
        {badMessage}
      </div>
      <input className={inputStyles.join(' ')} {...props} />
    </>
  );
};

export const StyledInput = React.memo(StyledInp);
