import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { bigNumberCommaSeparate, getCurrentUrl } from '../commons/utils';
import { ICardData } from '../types';
import './Card.css';

type Props = {
  cardData: ICardData;
  index: number;
};

const Card = (props: Props) => {
  const { cardData, index } = props;
  const {
    name,
    rotation_period,
    diameter,
    gravity,
    population,
    orbital_period,
    terrain,
    climate,
    url,
  } = cardData;

  const getPlanetId = (url: string | undefined) => {
    if (!url) return null;
    const urlArr = url.split('/');
    return urlArr[urlArr.length - 2];
  };

  const navigate = useNavigate();

  const toPath = `/${getPlanetId(url)}${getCurrentUrl(window.location.href) || ''}`;

  const cardClickHandler = () => navigate(toPath);

  return (
    <>
      <div onClick={cardClickHandler} className="card">
        <div className="titleBlock">
          <h2 className="cardTitle">
            {index}. {name}
          </h2>
          <div className="planet"></div>
        </div>

        <div className="cardDescription">
          <div className="cardDescriptionItem">
            <span>Diameter:</span>
            {bigNumberCommaSeparate(diameter)} km
          </div>
          <div className="cardDescriptionItem">
            <span>Population:</span>
            {bigNumberCommaSeparate(population)}
          </div>
          <div className="cardDescriptionItem">
            <span>Climate:</span>
            {bigNumberCommaSeparate(climate)}
          </div>
          <div className="cardDescriptionItem">
            <span>Rotate period:</span>
            {rotation_period} h
          </div>
          <div className="cardDescriptionItem">
            <span>Orbital period:</span>
            {orbital_period} d
          </div>
          <div className="cardDescriptionItem">
            <span>Terrain:</span>
            {terrain}
          </div>
          <div className="cardDescriptionItem">
            <span>Gravity:</span>
            {gravity}
          </div>
        </div>

        <NavLink
          aria-label="Show details"
          to={toPath}
          className={({ isActive, isPending }) =>
            isActive ? 'active' : isPending ? 'pending' : ''
          }
        >
          Details
        </NavLink>
      </div>
    </>
  );
};

export default React.memo(Card);
