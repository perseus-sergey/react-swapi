export const bigNumberCommaSeparate = (value: number | string) =>
  `${value}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

export const storageSetQuery = (value: string) => localStorage.setItem('query', value.trim());

export const storageGetQuery = () => localStorage.getItem('query');
