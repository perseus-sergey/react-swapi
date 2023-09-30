import { Component } from 'react';
import { getPosts, searchPosts } from '../API/PostService';
import { CARD_DRAFT, SEARCH_MIN_LENGTH } from '../commons/constants';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
// import { useFetching } from './useFetching';

class App extends Component {
  state = {
    query: '',
    cards: [CARD_DRAFT],
    isWrongInputSearch: false,
  };

  // private fetchPosts: () => Promise<void>;
  // private isPostLoading: boolean;
  // private errorLoadingPosts: string;

  constructor(props: string) {
    super(props);

    // const fetching = new useFetching({
    //   callback: async () => {
    //     this.setState({ ...this.state, cards: await getPosts() });
    //   },
    // });

    // const fetchingState = fetching.getState();

    // this.fetchPosts = fetchingState.fetching;
    // this.isPostLoading = fetchingState.isLoading;
    // this.errorLoadingPosts = fetchingState.error;
  }

  // componentDidMount(): void {
  //   const fetching = new useFetching({
  //     callback: async () => {
  //       this.setState({ ...this.state, cards: await getPosts() });
  //     },
  //   });

  //   const fetchingState = fetching.getState();

  //   this.fetchPosts = fetchingState.fetching;
  //   this.isPostLoading = fetchingState.isLoading;
  //   this.errorLoadingPosts = fetchingState.error;

  //   this.fetchPosts();
  // }

  componentDidMount(): void {
    this.fetchPosts(getPosts);
  }

  async fetchPosts(fetchFunction: () => Promise<void>) {
    try {
      this.setState({ ...this.state, isLoading: true });
      const cards = await fetchFunction();
      this.setState({ ...this.state, cards: cards });
      // await this.props.callback();
    } catch (e) {
      const error = e as Error;
      this.setState({ ...this.state, error: error.message });
    } finally {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  render() {
    return (
      <>
        <CardFilter
          query={this.state.query}
          setQuery={this.setQuery.bind(this)}
          submitSearch={this.submitSearch.bind(this)}
          isWrangInput={this.state.isWrongInputSearch}
        />

        <CardList cards={this.state.cards} cardListTitle={'Planets List'} />
      </>
    );
  }

  setQuery(query: string) {
    this.setState({ ...this.state, query: query });
  }

  async submitSearch() {
    if (!this.ifSearchWrong()) this.fetchPosts(await searchPosts(this.state.query));
  }

  ifSearchWrong() {
    if (this.state.query.length < SEARCH_MIN_LENGTH) {
      this.setState({ ...this.state, isWrongInputSearch: true });
      return true;
    }
    this.setState({ ...this.state, isWrongInputSearch: false });
    return false;
  }
}

export default App;
