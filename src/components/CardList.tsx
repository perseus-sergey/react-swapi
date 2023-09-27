import { ICardData } from '../types';
import { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  constructor(
    public props: {
      removeCardCallback: (removedCard: ICardData) => void;
      cards: ICardData[];
      cardListTitle: string;
    }
  ) {
    super(props.cards);
  }

  render() {
    const { removeCardCallback, cards, cardListTitle } = this.props;
    return cards.length ? (
      <>
        <h1 style={{ textAlign: 'center' }}>{cardListTitle}</h1>
        <div className="cards-wrapper">
          {cards.map((card: ICardData, indx) => (
            <Card
              removeCardCallback={removeCardCallback}
              index={indx + 1}
              key={card.id}
              cardData={card}
            />
          ))}
        </div>
      </>
    ) : (
      <>
        <h1 style={{ textAlign: 'center' }}>Results not found 👀 🤷</h1>
      </>
    );
  }
}

export default CardList;
