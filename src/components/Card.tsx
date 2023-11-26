import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { bigNumberCommaSeparate } from '../commons/utils';
import { ICardData } from '../types';
import style from './Card.module.css';

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

  const router = useRouter();
  const urlPath = usePathname();

  const getPlanetId = (url: string | undefined) => {
    if (!url) return null;
    const urlArr = url.split('/');
    return urlArr[urlArr.length - 2];
  };

  const toPath = `/planet/${getPlanetId(url)}${urlPath || ''}`;
  const cardClickHandler = () => router.push(toPath);

  return (
    <>
      <div onClick={cardClickHandler} className={style.card}>
        <div className={style.titleBlock}>
          <h2 className={style.cardTitle}>
            {index}. {name}
          </h2>
          <div className={style.planet}></div>
        </div>

        <div className={style.cardDescription}>
          <div className={style.cardDescriptionItem}>
            <span>Diameter:</span>
            {bigNumberCommaSeparate(diameter)} km
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Population:</span>
            {bigNumberCommaSeparate(population)}
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Climate:</span>
            {bigNumberCommaSeparate(climate)}
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Rotate period:</span>
            {rotation_period} h
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Orbital period:</span>
            {orbital_period} d
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Terrain:</span>
            {terrain}
          </div>
          <div className={style.cardDescriptionItem}>
            <span>Gravity:</span>
            {gravity}
          </div>
        </div>

        <Link aria-label="Show details" href={toPath}>
          Details
        </Link>
      </div>
    </>
  );
};

export default Card;
