export const bigNumberCommaSeparate = (value: number | string) =>
  `${value}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

export const storageSetQuery = (value: string) => localStorage.setItem('query', value.trim());

export const storageGetQuery = () => localStorage.getItem('query');

export const getApiPageNumber = (url: string): number => {
  const matches = url.match(/[&\?]page=(\d)+/);
  return matches && matches.length > 0 ? +matches[1] : 1;
};
