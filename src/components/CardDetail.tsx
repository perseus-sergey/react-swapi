import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bigNumberCommaSeparate } from '../commons/utils';
import { useGetPlanetQuery } from '../store/api/api';
import detailStyle from './CardDetail.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { Loader } from './UI/loader/Loader';

const CardDetail = () => {
  const { planetId } = useParams();
  const { data } = useGetPlanetQuery(planetId || 1);

  const navigate = useNavigate();

  return data ? (
    <>
      <button className={detailStyle.overlay} onClick={() => navigate(-1)}></button>
      <div className={detailStyle.card}>
        <div className={detailStyle.titleBlock}>
          <h2 className={detailStyle.cardTitle}>{data.name}</h2>
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
            {bigNumberCommaSeparate(data.diameter)} km
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Population:</span>
            {bigNumberCommaSeparate(data.population)}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Climate:</span>
            {bigNumberCommaSeparate(data.climate)}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Rotate period:</span>
            {data.rotation_period} h
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Orbital period:</span>
            {data.orbital_period} d
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Terrain:</span>
            {data.terrain}
          </div>
          <div className={detailStyle.cardDescriptionItem}>
            <span>Gravity:</span>
            {data.gravity}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default React.memo(CardDetail);
