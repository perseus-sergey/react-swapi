import { Component } from 'react';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
import { ICardData, IFilter } from '../types';
import './App.css';
import CardFilter from './CardFilter';
import CardList from './CardList';
import PostForm from './PostForm';

// TODO: clean form after creating card
// TODO: clean search button

class App extends Component {
  state = {
    filter: { sort: '', query: '' },
    cards: ['First', 'Second', 'Third', 'Fourth'].map((cardTitle, i) => {
      return {
        id: `card-${Date.now()}-${i}`,
        title: `${cardTitle} Card`,
        imgSource: 'image-source',
        description: `${cardTitle} description`,
      };
    }),
  };

  render() {
    return (
      <>
        <PostForm createCardCallback={this.createCardCallback} />

        <CardFilter filter={this.state.filter} setFilter={this.setFilter.bind(this)} />

        <CardList
          removeCardCallback={this.removeCardCallback}
          cards={this.searchedAndSortedCards()}
          cardListTitle={'Result List'}
        />
      </>
    );
  }

  setFilter(filter: IFilter) {
    this.setState({ ...this.state, filter: filter });
  }

  createCardCallback = (newCard: ICardData) =>
    this.setState({ ...this.state, cards: [...this.state.cards, newCard] });

  removeCardCallback = (removedCard: ICardData) =>
    this.setState({
      ...this.state,
      cards: this.state.cards.filter((card) => card.id !== removedCard.id),
    });

  sortedCards = () => {
    const sortField = this.state.filter.sort as keyof ICardData;

    return this.state.filter.sort
      ? [...this.state.cards].sort((a, b) => a[sortField].localeCompare(b[sortField]))
      : this.state.cards;
  };

  searchedAndSortedCards = () => {
    return this.state.filter.query.length < SEARCH_MIN_LENGTH
      ? this.sortedCards()
      : this.sortedCards().filter((card) =>
          card.title.toLowerCase().includes(this.state.filter.query)
        );
  };

  // shouldComponentUpdate(nextProps: IAppState, nextState: IAppState) {
  //   if (
  //     nextState.filter.sort === this.state.filter.sort &&
  //     nextState.cards === this.state.cards &&
  //     nextState.filter.query === this.state.filter.query
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }
}

export default App;
