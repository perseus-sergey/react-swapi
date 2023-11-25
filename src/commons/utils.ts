export const bigNumberCommaSeparate = (value: number | string) =>
  `${value}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');

export const getUrlParam = (paramName: string, uRLSearchParams = window.location.search): string =>
  new URLSearchParams(uRLSearchParams).get(paramName) || '';

export const getCurrentUrl = (url: string): string | null => {
  const matches = url.match(/(\/\?[^\/]+)/);
  return matches && matches.length > 0 ? matches[1] : null;
};
