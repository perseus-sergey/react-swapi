import React, { useState } from 'react';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
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
  const [postsCount] = useState(0);
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);

  const submitSearch = async () => {
    if (isSearchWrong()) {
      setIsWrongInputSearch(true);
      return;
    }
    // fetchPosts(query);
  };

  const setQueryToStorage = (query: string) => {
    storageSetQuery(query);

    setQuery(query);
  };

  const isSearchWrong = () => {
    const { length } = query.trim();
    return length !== 0 && length < SEARCH_MIN_LENGTH;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeaderStyled />
      <main className="main">
        <CardFilter
          query={query}
          setQuery={setQueryToStorage}
          submitSearch={submitSearch}
          isWrangInput={isWrongInputSearch}
        />

        {/* {error ? <h4>Something went wrong: {error}</h4> : ''} */}
        {postsCount ? <h4>Results: {postsCount}</h4> : ''}
        {/* <ErrorButton /> */}

        <Outlet />
      </main>
      <FooterStyled />
    </ErrorBoundary>
  );
};

export default React.memo(App);
