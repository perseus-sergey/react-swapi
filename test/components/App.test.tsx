import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import classes from '../../../../src/components/UI/loader/loader.module.css';
import App from '../../src/components/App';

describe('App tests', () => {
  const loaderTestId = 'loaderTestId';

  it('expect contains style', () => {
    render(<App data-testid={loaderTestId} />);
    const loader = screen.getByTestId(loaderTestId);
    expect(loader.classList.contains(classes.loader)).toBeTruthy();
  });
});
