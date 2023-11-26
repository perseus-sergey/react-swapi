import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import { bigNumberCommaSeparate } from '../commons/utils';
import { useGetPlanetQuery } from '../store/planetApi';
import detailStyle from './CardDetail.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { Loader } from './UI/loader/Loader';

const CardDetail = () => {
  const router = useRouter();

  const planetId = router.query.id;
  const { isLoading, error, data } = useGetPlanetQuery(
    typeof planetId === 'string' ? planetId : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : router.isFallback || isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <button className={detailStyle.overlay} onClick={() => router.back()}></button>
          <div className={detailStyle.card}>
            <div className={detailStyle.titleBlock}>
              <h2 className={detailStyle.cardTitle}>{data.name}</h2>
              <div className={detailStyle.planet}></div>
              <StyledButton
                type="button"
                aria-label="Close detail view"
                className={detailStyle.closeBtn}
                onClick={() => router.back()}
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
      ) : null}
    </>
  );
};

export default CardDetail;
