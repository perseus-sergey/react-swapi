import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { getUrlParam } from '../commons/utils';

type Props = { children: JSX.Element };
type SearchProvider = { query: string; setQuery: Dispatch<SetStateAction<string>> };

const SearchContext = createContext<SearchProvider>({} as SearchProvider);

const SearchProvider = ({ children }: Props) => {
  const [query, setQuery] = useState(getUrlParam('q'));

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => useContext(SearchContext);

export default SearchProvider;
