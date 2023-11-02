import { IApiResponse, ICardData } from '../types';
import React from 'react';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';

type Props = {
  apiResponse: IApiResponse | undefined;
  cardListTitle: string;
  paginationCallback: (url: string) => void;
  currentApiPageNumber: number;
};

const CardList = (props: Props) => {
  const { apiResponse, cardListTitle, paginationCallback, currentApiPageNumber } = props;

  const emptyResultView = (
    <>
      <h1 className="h1-title">Planets not found 👀 🤷</h1>
    </>
  );
  if (!apiResponse) return emptyResultView;
  const { count, results, previous, next } = apiResponse;

  const getPaginationPage = (url = '') => {
    paginationCallback(url);
  };
  return apiResponse && count && results[0].name ? (
    <>
      <h1 className="h1-title">{cardListTitle}</h1>
      <div className="pagination">
        <button
          type="button"
          aria-label="Show previous search page"
          disabled={!previous}
          className={'pagination-btn ' + (previous ? 'active' : '')}
          onClick={previous ? () => getPaginationPage(previous || '') : undefined}
        >
          {'< Previous Page'}
        </button>
        <button
          type="button"
          aria-label="Show next search page"
          disabled={!next}
          className={'pagination-btn ' + (next ? 'active' : '')}
          onClick={next ? () => getPaginationPage(next || '') : undefined}
        >
          {'Next Page >'}
        </button>
      </div>
      <div className="cards-wrapper">
        {results.map((card: ICardData, indx) => (
          <Card
            index={indx + (currentApiPageNumber - 1) * CARD_PER_PAGE + 1}
            key={card.name}
            cardData={card}
          />
        ))}
      </div>
    </>
  ) : (
    emptyResultView
  );
};

export default React.memo(CardList);
