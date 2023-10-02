import { faCheck, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from '../../../types';
import classes from './StyledButton.module.css';

const StyledButton = ({ buttonType, children, ...props }: ButtonProps) => {
  let buttonStyle = children ? classes.textButton : classes.iconButton;
  let iconSvg;

  switch (buttonType) {
    case 'submit':
      buttonStyle += ` ${classes.submitButton}`;
      iconSvg = <FontAwesomeIcon icon={faCheck} />;
      break;
    case 'cancel':
      buttonStyle += ` ${classes.cancelButton}`;
      iconSvg = <FontAwesomeIcon icon={faXmark} />;
      break;
    case 'delete':
      buttonStyle += ` ${classes.deleteButton}`;
      iconSvg = <FontAwesomeIcon icon={faTrashCan} />;
      break;

    default:
      break;
  }

  return (
    <button {...props} className={buttonStyle}>
      {iconSvg && iconSvg}
      {children && children}
    </button>
  );
};

export default StyledButton;

// https://stackoverflow.com/questions/40731352/extending-html-elements-in-react-and-typescript-while-preserving-props?answertab=modifieddesc#tab-top
