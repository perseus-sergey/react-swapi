import { ICardData } from '../types';
import React from 'react';
import Card from './Card';
import style from './CardList.module.css';
import { CARD_PER_PAGE } from '../commons/constants';
import Pagination from './Pagination';
import { Loader } from './UI/loader/Loader';
import { useSearchEndpointQuery } from '../store/planetApi';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';

const CardList = () => {
  const router = useRouter();

  const page = Number(router.query.page) || 1;
  const query = router.query.query || '';
  console.log('🚀 ~ file: CardList.tsx:17 ~ CardList ~ query:', query);

  const { isLoading, error, data } = useSearchEndpointQuery(
    typeof query === 'string' ? { text: query, page } : skipToken,
    { skip: router.isFallback }
  );

  if (router.isFallback || isLoading) return <Loader />;

  if (error && error instanceof Error) return <h2>Sorry. Something went wrong. {error.message}</h2>;

  if (!data) return <h1 className="h1-title">Planets not found 👀 🤷</h1>;

  const { results } = data;

  if (!data.count || !results[0].name) return <h1 className="h1-title">Planets not found 👀 🤷</h1>;

  return (
    <>
      {data && data.count ? <h4>Results: {data.count}</h4> : ''}
      <h1 className={style.h1Title}>Planets List</h1>
      <div className={style.content}>
        <section className={style.cardList}>
          <Pagination previousApiPage={data.previous} nextApiPage={data.next} />

          {/* {navigation.state === 'loading' && <Loader />} */}

          <div className={style.cardsWrapper}>
            {results.map((card: ICardData, indx: number) => (
              <Card index={indx + 1 + (page - 1) * CARD_PER_PAGE} key={card.name} cardData={card} />
            ))}
          </div>
        </section>
        <section className={style.cardDetail}>{/* <Outlet /> */}</section>
      </div>
    </>
  );
};

export default React.memo(CardList);
