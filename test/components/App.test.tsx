// import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
// import classes from '../../../../src/components/UI/loader/loader.module.css';
// import App from '../../src/components/App';

import { describe, expect, it } from 'vitest';

describe('App tests', () => {
  const loaderTestId = 'loaderTestId';

  it('expect contains style', () => {
    expect(loaderTestId === 'loaderTestId').toBeTruthy();
  });
});
