import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StyledInput } from '../../src/components/UI/input/StyledInput';

describe('StyledInput tests', () => {
  const inputTestId = 'inputTestId';
  const isWrongInputSearch = true;
  const inputVal = '12';
  const onChangeInput = vi.fn();
  let input: HTMLInputElement;

  beforeEach(() => {
    render(
      <StyledInput
        data-testid={inputTestId}
        id="q"
        name="q"
        badMessage="Minimum 2 characters!"
        isWrang={isWrongInputSearch}
        value={inputVal}
        aria-label="Search input"
        placeholder="Search..."
        onChange={onChangeInput}
      />
    );
    input = screen.getByTestId(inputTestId);
  });

  it('check default value', () => {
    expect(input.value).toBe(inputVal);
  });

  it('StyledInput use html tag input', () => {
    expect(input.tagName).toBe('INPUT');
  });
});
