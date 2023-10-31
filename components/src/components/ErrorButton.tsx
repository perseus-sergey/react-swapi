import React, { PureComponent } from 'react';
import { StyledButton } from './UI/button/StyledButton';

class ErrorButton extends PureComponent {
  state = {
    isError: false,
  };

  throwErrorBtnHandler = () => {
    this.setState((prevState) => ({ ...prevState, isError: true }));
  };

  render() {
    if (this.state.isError) throw new Error('This is a test error!\nError button was clicked.');

    return (
      <StyledButton buttonType="cancel" onClick={this.throwErrorBtnHandler}>
        Throw Error
      </StyledButton>
    );
  }
}

export default React.memo(ErrorButton);
