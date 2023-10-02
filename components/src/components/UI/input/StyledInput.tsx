import { InputProps } from '../../../types';
import classes from './StyledInput.module.css';

const StyledInput = ({ badMessage, isWrang, ...props }: InputProps) => {
  const wrongStyles = [classes.errorMessage];
  if (isWrang) wrongStyles.push(classes.active);

  const inputStyles = [classes.styledInput];
  if (isWrang) inputStyles.push(classes.wrong);

  return (
    <>
      <div className={wrongStyles.join(' ')}>{badMessage}</div>
      <input className={inputStyles.join(' ')} {...props} />
    </>
  );
};

export default StyledInput;
