import { Component, MouseEventHandler } from 'react';
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
import { StyledButton } from './UI/button/StyledButton';

class App extends Component {
  state = {
    query: '',
    cards: [CARD_DRAFT],
    postsCount: 0,
    isWrongInputSearch: false,
    error: '',
    isLoading: false,
  };

  fallback = (<div>Oh no! Something went wrong</div>);

  componentDidMount() {
    this.fetchPosts();
  }

  submitSearch = async () => {
    if (this.isSearchWrong()) {
      this.setState((prevState) => ({ ...prevState, isWrongInputSearch: true }));
      return;
    }

    this.fetchPosts(this.state.query);
  };

  throwErrorBtnHandler = () => {
    this.setState((prevState) => ({ ...prevState, error: 'Fake Error!!!' }));
  };

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
    } catch (error) {
      this.setState((prevState) => ({ ...prevState, error: (error as Error).message }));
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeaderStyled />
          <main>
            <CardFilter
              query={this.state.query}
              setQuery={this.setQuery.bind(this)}
              submitSearch={this.submitSearch}
              isWrangInput={this.state.isWrongInputSearch}
            />

            {this.state.error ? <h4>Something went wrong: {this.state.error}</h4> : ''}
            {this.state.postsCount ? <h4>Results: {this.state.postsCount}</h4> : ''}
            <ErrorButton />

            {this.state.isLoading ? (
              <Loader />
            ) : (
              <CardList cards={this.state.cards} cardListTitle={'Planets List'} />
            )}
          </main>
          <FooterStyled />
        </ErrorBoundary>
      </>
    );
  }
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <StyledButton style={{ margin: '0 auto' }} buttonType="cancel" onClick={resetErrorBoundary}>
        Return
      </StyledButton>
    </div>
  );
}

export default App;
