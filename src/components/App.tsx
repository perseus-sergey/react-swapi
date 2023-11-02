import React, { useCallback, useEffect, useState } from 'react';
import { getPosts, searchPosts } from '../API/PostService';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
import { getApiPageNumber, storageGetQuery, storageSetQuery } from '../commons/utils';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import { Loader } from './UI/loader/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { Outlet } from 'react-router-dom';
import { IApiResponse } from '../types';

const App = () => {
  const [query, setQuery] = useState('');
  const [apiResponse, setApiResponse] = useState<IApiResponse>();
  const [postsCount, setPostsCount] = useState(0);
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentApiPageNumber, setCurrentApiPageNumber] = useState(1);

  const fetchPosts = useCallback(async (value = '', paginationUrl?: string) => {
    const curApiPageNum = paginationUrl ? getApiPageNumber(paginationUrl) : 1;
    setCurrentApiPageNumber(+curApiPageNum);

    try {
      setIsLoading(true);
      setIsWrongInputSearch(false);
      setQuery(storageGetQuery() || '');

      const result =
        value && !paginationUrl ? await searchPosts(value) : await getPosts(paginationUrl);
      setApiResponse(result);
      setPostsCount(result.count);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const submitSearch = async () => {
    if (isSearchWrong()) {
      setIsWrongInputSearch(true);
      return;
    }
    fetchPosts(query);
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
      <div className="window">
        <main className="main">
          <CardFilter
            query={query}
            setQuery={setQueryToStorage}
            submitSearch={submitSearch}
            isWrangInput={isWrongInputSearch}
          />

          {error ? <h4>Something went wrong: {error}</h4> : ''}
          {postsCount ? <h4>Results: {postsCount}</h4> : ''}
          {/* <ErrorButton /> */}

          {isLoading ? (
            <Loader />
          ) : (
            <CardList
              paginationCallback={(url: string) => fetchPosts('', url)}
              apiResponse={apiResponse}
              currentApiPageNumber={currentApiPageNumber}
              cardListTitle={'Planets List'}
            />
          )}
        </main>
        <section className="card-detail">
          <Outlet></Outlet>
        </section>
      </div>
      <FooterStyled />
    </ErrorBoundary>
  );
};

export default React.memo(App);
