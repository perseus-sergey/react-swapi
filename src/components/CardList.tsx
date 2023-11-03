import { IApiResponse, ICardData } from '../types';
import React from 'react';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import Pagination from './Pagination';

const emptyResultView = (
  <>
    <h1 className="h1-title">Planets not found 👀 🤷</h1>
  </>
);

const CardList = () => {
  const { pageId } = useParams();
  const apiResponse = useLoaderData() as IApiResponse;
  if (!apiResponse) return emptyResultView;
  const { count, results, previous, next } = apiResponse;

  return apiResponse && count && results[0].name ? (
    <>
      <h1 className="h1-title">Planets List</h1>
      <div className="content">
        <section className="card-list">
          <Pagination previousApiPage={previous} nextApiPage={next} />

          <div className="cards-wrapper">
            {results.map((card: ICardData, indx) => (
              <Card
                index={indx + 1 + (Number(pageId || 1) - 1) * CARD_PER_PAGE}
                key={card.name}
                cardData={card}
              />
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
