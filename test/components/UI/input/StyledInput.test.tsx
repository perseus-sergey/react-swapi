import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StyledInput } from '../../../../src/components/UI/input/StyledInput';

describe('StyledInp tests', () => {
  const inputTestId = 'inputTestId';
  const badMessage = 'Bad Message';

  it('expect has wrongStyles', () => {
    const isWrang = true;
    render(<StyledInput data-testid={inputTestId} isWrang={isWrang} badMessage={badMessage} />);
    const wrongDiv = screen.queryByRole('alert') as HTMLElement;
    expect(!!wrongDiv.classList[1]).toBeTruthy();
  });

  it("expect hasn't wrongStyles", () => {
    const isWrang = false;
    render(<StyledInput data-testid={inputTestId} isWrang={isWrang} badMessage={badMessage} />);
    const wrongDiv = screen.queryByRole('alert') as HTMLElement;
    expect(!!wrongDiv.classList[1]).toBeFalsy();
  });
});
