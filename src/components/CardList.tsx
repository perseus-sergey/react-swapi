import { ICardData } from '../types';
import { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  constructor(
    public props: {
      cards: ICardData[];
      cardListTitle: string;
    }
  ) {
    super(props.cards);
  }

  render() {
    const { cards, cardListTitle } = this.props;
    return cards.length && cards[0].name ? (
      <>
        <h1 style={{ textAlign: 'center' }}>{cardListTitle}</h1>
        <div className="cards-wrapper">
          {cards.map((card: ICardData, indx) => (
            <Card index={indx + 1} key={card.name} cardData={card} />
          ))}
        </div>
      </>
    ) : (
      <>
        <h1 style={{ textAlign: 'center' }}>Planets not found 👀 🤷</h1>
      </>
    );
  }
}

export default CardList;
