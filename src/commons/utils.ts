export const bigNumberCommaSeparate = (value: number | string) =>
  `${value}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
