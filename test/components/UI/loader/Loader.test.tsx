import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../../../../src/components/UI/loader/Loader';
import classes from '../../../../src/components/UI/loader/loader.module.css';

describe('Loader tests', () => {
  const loaderTestId = 'loaderTestId';

  it('expect contains style', () => {
    render(<Loader data-testid={loaderTestId} />);
    const loader = screen.getByTestId(loaderTestId);
    expect(loader.classList.contains(classes.loader)).toBeTruthy();
  });
});
