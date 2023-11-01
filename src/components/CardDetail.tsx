import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { bigNumberCommaSeparate } from '../commons/utils';
import { ICardData } from '../types';
import detailStyle from './CardDetail.module.css';
import { StyledButton } from './UI/button/StyledButton';

const CardDetail = () => {
  const params = useLoaderData() as ICardData;
  const { name, rotation_period, diameter, gravity, population, orbital_period, terrain, climate } =
    params;

  const navigate = useNavigate();

  return (
    <>
      <div className={detailStyle.card}>
        <div className={detailStyle.titleBlock}>
          <h2 className={detailStyle.cardTitle}>{name}</h2>
          <div className={detailStyle.planet}></div>
          <StyledButton
            type="button"
            aria-label="Close detail view"
            className={detailStyle.closeBtn}
            onClick={() => navigate(-1)}
            buttonType="cancel"
          ></StyledButton>
        </div>
        <div className={detailStyle.cardDescription}>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Diameter:</span>
            {bigNumberCommaSeparate(diameter)} km
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Population:</span>
            {bigNumberCommaSeparate(population)}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Climate:</span>
            {bigNumberCommaSeparate(climate)}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Rotate period:</span>
            {rotation_period} h
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Orbital period:</span>
            {orbital_period} d
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Terrain:</span>
            {terrain}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Gravity:</span>
            {gravity}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CardDetail);
