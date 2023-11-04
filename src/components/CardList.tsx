import { IApiResponse, ICardData } from '../types';
import React from 'react';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';
import { Outlet, useLoaderData, useNavigation, useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import { Loader } from './UI/loader/Loader';

const emptyResultView = (
  <>
    <h1 className="h1-title">Planets not found 👀 🤷</h1>
  </>
);

const CardList = () => {
  const apiResponse = useLoaderData() as IApiResponse;
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const page = Number(searchParams.get('page')) || 1;

  if (!apiResponse) return emptyResultView;
  const { count, results, previous, next } = apiResponse;

  return apiResponse && count && results[0].name ? (
    <>
      {count ? <h4>Results: {count}</h4> : ''}
      <h1 className="h1-title">Planets List</h1>
      <div className="content">
        <section className="card-list">
          {navigation.state === 'idle' && (
            <Pagination previousApiPage={previous} nextApiPage={next} />
          )}

          {navigation.state === 'loading' && <Loader />}

          <div className="cards-wrapper">
            {results.map((card: ICardData, indx) => (
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
    emptyResultView
  );
};

export default React.memo(CardList);
