import classes from '../../../../src/components/UI/button/StyledButton.module.css';

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StyledButton } from '../../../../src/components/UI/button/StyledButton';
import { ButtonType } from '../../../../src/types';

describe('StyledBtn tests', () => {
  const buttonTestId = 'buttonTestId';
  let button: HTMLButtonElement;

  it('expect icon submit', () => {
    const buttonType: ButtonType = 'submit';
    render(<StyledButton data-testid={buttonTestId} buttonType={buttonType} />);
    button = screen.getByTestId(buttonTestId);
    expect(button.children[0].getAttribute('class')?.trim()).to.equal('svg-inline--fa fa-check');
  });

  it('expect icon cancel', () => {
    const buttonType: ButtonType = 'cancel';
    render(<StyledButton data-testid={buttonTestId} buttonType={buttonType} />);
    button = screen.getByTestId(buttonTestId);
    expect(button.children[0].getAttribute('class')?.trim()).to.equal('svg-inline--fa fa-xmark');
  });

  it('expect icon delete', () => {
    const buttonType: ButtonType = 'delete';
    render(<StyledButton data-testid={buttonTestId} buttonType={buttonType} />);
    button = screen.getByTestId(buttonTestId);
    expect(button.children[0].getAttribute('class')?.trim()).to.equal(
      'svg-inline--fa fa-trash-can'
    );
  });

  it('expect classes.textButton', () => {
    const buttonType: ButtonType = 'delete';
    render(
      <StyledButton data-testid={buttonTestId} buttonType={buttonType}>
        Ok
      </StyledButton>
    );
    button = screen.getByTestId(buttonTestId);
    expect(button.classList.contains(classes.textButton)).toBeTruthy();
  });

  // describe('StyledBtn tests', () => {
  //   const buttonTestId = 'buttonTestId';
  //   let button: HTMLButtonElement;
  //   const buttonType: ButtonType = 'submit';

  //   beforeEach(() => {
  //     render(<StyledButton data-testid={buttonTestId} buttonType={buttonType} />);
  //     button = screen.getByTestId(buttonTestId);
  //   });

  //   it('expect equal', () => {
  //     expect(button.children[0].getAttribute('class')?.trim()).to.equal('svg-inline--fa fa-check');
  //   });
});
