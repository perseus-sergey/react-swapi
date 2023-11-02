import React, { useCallback, useEffect, useState } from 'react';
import { getPosts, searchPosts } from '../API/PostService';
import { CARD_DRAFT, SEARCH_MIN_LENGTH } from '../commons/constants';
import { storageGetQuery, storageSetQuery } from '../commons/utils';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import { Loader } from './UI/loader/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorButton from './ErrorButton';
import ErrorFallback from './ErrorFallback';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([CARD_DRAFT]);
  const [postsCount, setPostsCount] = useState(0);
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async (value = '') => {
    try {
      setIsLoading(true);
      setIsWrongInputSearch(false);
      setQuery(storageGetQuery() || '');

      const result = value ? await searchPosts(value) : await getPosts();
      setCards(result.posts);
      setPostsCount(result.postsCount);
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
          <ErrorButton />

          {isLoading ? <Loader /> : <CardList cards={cards} cardListTitle={'Planets List'} />}
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
