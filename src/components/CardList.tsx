import { IApiResponse, ICardData } from '../types';
import React from 'react';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getApiPageNumber } from '../commons/utils';

const CardList = () => {
  const navigate = useNavigate();
  const { pageId } = useParams();
  const apiResponse = useLoaderData() as IApiResponse;
  const emptyResultView = (
    <>
      <h1 className="h1-title">Planets not found 👀 🤷</h1>
    </>
  );
  if (!apiResponse) return emptyResultView;
  const { count, results, previous, next } = apiResponse;

  const getPaginationPage = (paginationUrl = '') => {
    const toPageNumber = paginationUrl ? getApiPageNumber(paginationUrl) : 1;
    navigate(`/page/${toPageNumber}`);
  };

  return apiResponse && count && results[0].name ? (
    <>
      <h1 className="h1-title">Planets List</h1>
      <div className="content">
        <section className="card-list">
          <div className="pagination">
            <button
              type="button"
              aria-label="Show previous search page"
              disabled={!previous}
              className={`pagination-btn ${previous ? 'active' : ''}`}
              onClick={previous ? () => getPaginationPage(previous || '') : undefined}
            >
              {'< Previous Page'}
            </button>
            <button
              type="button"
              aria-label="Show next search page"
              disabled={!next}
              className={`pagination-btn ${next ? 'active' : ''}`}
              onClick={next ? () => getPaginationPage(next || '') : undefined}
            >
              {'Next Page >'}
            </button>
          </div>
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
