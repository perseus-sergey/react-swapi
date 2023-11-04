export const bigNumberCommaSeparate = (value: number | string) =>
  `${value}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

export const storageSetQuery = (value: string) => localStorage.setItem('query', value.trim());

export const storageGetQuery = () => localStorage.getItem('query');

type UrlDestination = 'local' | 'remote';

export const getPageNumber = (url: string, urlDestination: UrlDestination): number => {
  const matches = url.match(urlDestination === 'local' ? /\/page\/(\d*)/ : /[&\?]page=(\d)+/);
  return matches && matches.length > 0 ? +matches[1] : 1;
};

export const getUrlParams = (url: string): string[] | [null] =>
  url.match(/\?q=([^\/]*)(?:\/page\/(\d*))?/) || [null];

export const getCurrentUrl = (url: string): string | null => {
  const matches = url.match(/(\/\?[^\/]+)/);
  return matches && matches.length > 0 ? matches[1] : null;
};
