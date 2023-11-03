import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiPageNumber } from '../commons/utils';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = (props: Props) => {
  const { previousApiPage, nextApiPage } = props;
  const navigate = useNavigate();

  const getPaginationPage = (paginationUrl = '') => {
    const toPageNumber = paginationUrl ? getApiPageNumber(paginationUrl) : 1;
    navigate(`/page/${toPageNumber}`);
  };

  return (
    <div className="pagination">
      <button
        type="button"
        aria-label="Show previousApiPage search page"
        disabled={!previousApiPage}
        className={`pagination-btn ${previousApiPage ? 'active' : ''}`}
        onClick={previousApiPage ? () => getPaginationPage(previousApiPage || '') : undefined}
      >
        {'< Previous Page'}
      </button>
      <button
        type="button"
        aria-label="Show nextApiPage search page"
        disabled={!nextApiPage}
        className={`pagination-btn ${nextApiPage ? 'active' : ''}`}
        onClick={nextApiPage ? () => getPaginationPage(nextApiPage || '') : undefined}
      >
        {'Next Page >'}
      </button>
    </div>
  );
};

export default Pagination;
