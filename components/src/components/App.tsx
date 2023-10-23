import { Component } from 'react';
import { getPosts, searchPosts } from '../API/PostService';
import { CARD_DRAFT, SEARCH_MIN_LENGTH } from '../commons/constants';
import { storageGetQuery, storageSetQuery } from '../commons/utils';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import { Loader } from './UI/loader/Loader';

class App extends Component {
  state = {
    query: '',
    cards: [CARD_DRAFT],
    postsCount: 0,
    isWrongInputSearch: false,
    error: '',
    isLoading: false,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  async submitSearch() {
    if (this.isSearchWrong()) {
      this.setState((prevState) => ({ ...prevState, isWrongInputSearch: true }));
      return;
    }

    this.fetchPosts(this.state.query);
  }

  async fetchPosts(query = '') {
    try {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isWrongInputSearch: false,
        query: storageGetQuery() || '',
      }));
      const result = query ? await searchPosts(query) : await getPosts();
      this.setState((prevState) => ({
        ...prevState,
        cards: result.posts,
        postsCount: result.postsCount,
      }));
    } catch (e) {
      const error = e as Error;
      this.setState((prevState) => ({ ...prevState, error: error.message }));
    } finally {
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  setQuery(query: string) {
    storageSetQuery(query);

    this.setState((prevState) => ({ ...prevState, query: query }));
  }

  isSearchWrong() {
    return this.state.query.length < SEARCH_MIN_LENGTH;
  }

  render() {
    return (
      <>
        <HeaderStyled />
        <main>
          <CardFilter
            query={this.state.query}
            setQuery={this.setQuery.bind(this)}
            submitSearch={this.submitSearch.bind(this)}
            isWrangInput={this.state.isWrongInputSearch}
          />

          {this.state.error ? <h4>Error loading: {this.state.error}</h4> : ''}
          {this.state.postsCount ? <h4>Results: {this.state.postsCount}</h4> : ''}

          {this.state.isLoading ? (
            <Loader />
          ) : (
            <CardList cards={this.state.cards} cardListTitle={'Planets List'} />
          )}
        </main>
        <FooterStyled />
      </>
    );
  }
}

export default App;
