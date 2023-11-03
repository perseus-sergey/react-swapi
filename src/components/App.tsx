import React, { useState } from 'react';
import { storageSetQuery } from '../commons/utils';
import './App.css';
import CardFilter from './CardFilter';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [query, setQuery] = useState('');
  // const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();

  // const submitSearch = async () => {
  //   console.log('🚀 ~ file: App.tsx:28 ~ submitSearch ~ submitSearch:', 'submitSearch');
  //   if (isSearchWrong()) {
  //     setIsWrongInputSearch(true);
  //     return;
  //   }
  //   if (!searchParams.get('page'))
  //     setSearchParams((params) => {
  //       params.set('page', '1');
  //     });
  //   // fetchPosts(query);
  // };

  const setQueryToStorage = (query: string) => {
    storageSetQuery(query);

    setQuery(query);
  };

  // const isSearchWrong = () => {
  //   const { length } = query.trim();
  //   return length !== 0 && length < SEARCH_MIN_LENGTH;
  // };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeaderStyled />
      <main className="main">
        <CardFilter
          query={query}
          setQuery={setQueryToStorage}
          // submitSearch={submitSearch}
          // isWrangInput={isWrongInputSearch}
        />

        {/* {error ? <h4>Something went wrong: {error}</h4> : ''} */}
        {/* <ErrorButton /> */}

        <Outlet />
      </main>
      <FooterStyled />
    </ErrorBoundary>
  );
};

export default React.memo(App);
