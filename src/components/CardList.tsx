import { ICardData } from '../types';
import React from 'react';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import { Loader } from './UI/loader/Loader';
import { useSearchQuery } from '../store/api/api';
import { getUrlParam } from '../commons/utils';

const CardList = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const { isLoading, data } = useSearchQuery({ text: getUrlParam('q'), page });

  if (isLoading) return <Loader />;
  return data && data.count && data.results[0].name ? (
    <>
      {data && data.count ? <h4>Results: {data.count}</h4> : ''}
      <h1 className="h1-title">Planets List</h1>
      <div className="content">
        <section className="card-list">
          <Pagination previousApiPage={data.previous} nextApiPage={data.next} />

          <div className="cards-wrapper">
            {data.results.map((card: ICardData, indx: number) => (
              <Card index={indx + 1 + (page - 1) * CARD_PER_PAGE} key={card.name} cardData={card} />
            ))}
          </div>
        </section>
        <section className="card-detail">
          <Outlet />
        </section>
      </div>
    </>
  ) : (
    <h1 className="h1-title">Planets not found 👀 🤷</h1>
  );
};

export default React.memo(CardList);
