import { InputProps } from '../../../types';
import classes from './StyledInput.module.css';

const StyledInput = (props: InputProps) => {
  return <input className={classes.styledInput} {...props} />;
};

export default StyledInput;
