import { Component } from 'react';
import { getPosts, searchPosts } from '../API/PostService';
import { CARD_DRAFT, SEARCH_MIN_LENGTH } from '../commons/constants';
import { storageGetQuery, storageSetQuery } from '../commons/utils';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import Loader from './UI/loader/Loader';

class App extends Component {
  state = {
    query: '',
    // cards: [CARD_DRAFT],
    isWrongInputSearch: false,
    // error: '',
    isLoading: false,
  };

  private errorMessage = '';
  private postsCount = 0;
  private cards = [CARD_DRAFT];

  componentDidMount() {
    this.fetchPosts();
  }

  async submitSearch() {
    if (this.isSearchWrong()) {
      this.setState({ ...this.state, isWrongInputSearch: true });
      return;
    }

    this.fetchPosts(this.state.query);
  }

  async fetchPosts(query = '') {
    this.postsCount = 0;

    try {
      this.setState({
        // cards: await fetchFunction(),
        isLoading: true,
        isWrongInputSearch: false,
        query: storageGetQuery() || '',
      });
      const result = query ? await searchPosts(query) : await getPosts();
      this.cards = result.posts;
      this.postsCount = result.postsCount;
    } catch (e) {
      const error = e as Error;
      // this.setState({ ...this.state, error: error.message });
      this.errorMessage = error.message;
    } finally {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  setQuery(query: string) {
    storageSetQuery(query);

    this.setState({ ...this.state, query: query });
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

          {this.errorMessage ? <h4>Error loading: {this.errorMessage}</h4> : ''}
          {this.postsCount ? <h4>Results: {this.postsCount}</h4> : ''}

          {this.state.isLoading ? (
            <Loader />
          ) : (
            <CardList cards={this.cards} cardListTitle={'Planets List'} />
          )}
        </main>
        <FooterStyled />
      </>
    );
  }
}

export default App;
