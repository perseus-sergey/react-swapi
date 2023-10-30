import React, { PureComponent } from 'react';
import { bigNumberCommaSeparate } from '../commons/utils';
import { ICardData } from '../types';
import './Card.css';

type Props = {
  cardData: ICardData;
  index: number;
};

class Card extends PureComponent<Props> {
  render() {
    const { cardData, index } = this.props;
    const {
      name,
      rotation_period,
      diameter,
      gravity,
      population,
      orbital_period,
      terrain,
      climate,
    } = cardData;

    return (
      <div className="card">
        <div className="title-block">
          <h2 className="card-title">
            {index}. {name}
          </h2>
          <div className="planet"></div>
        </div>
        <div className="card-description">
          <div className="card-description-item">
            <span>Diameter:</span>
            {bigNumberCommaSeparate(diameter)} km
          </div>
          <div className="card-description-item">
            <span>Population:</span>
            {bigNumberCommaSeparate(population)}
          </div>
          <div className="card-description-item">
            <span>Climate:</span>
            {bigNumberCommaSeparate(climate)}
          </div>
          <div className="card-description-item">
            <span>Rotate period:</span>
            {rotation_period} h
          </div>
          <div className="card-description-item">
            <span>Orbital period:</span>
            {orbital_period} d
          </div>
          <div className="card-description-item">
            <span>Terrain:</span>
            {terrain}
          </div>
          <div className="card-description-item">
            <span>Gravity:</span>
            {gravity}
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(Card);
