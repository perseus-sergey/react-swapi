import { ICardData } from '../types';
import React, { PureComponent } from 'react';
import Card from './Card';

type Props = {
  cards: ICardData[];
  cardListTitle: string;
};

class CardList extends PureComponent<Props> {
  render() {
    const { cards, cardListTitle } = this.props;
    return cards && cards.length && cards[0].name ? (
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

export default React.memo(CardList);
