import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = (props: Props) => {
  const { previousApiPage, nextApiPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePrev = () => {
    setSearchParams((params) => {
      params.set('page', `${Math.max(1, page - 1)}`);
      return params;
    });
  };

  const handleNext = () => {
    setSearchParams((params) => {
      params.set('page', `${page + 1}`);
      return params;
    });
  };

  return (
    <div className="pagination">
      <button
        type="button"
        aria-label="Show previousApiPage search page"
        disabled={!previousApiPage}
        className={`pagination-btn ${previousApiPage ? 'active' : ''}`}
        onClick={handlePrev}
      >
        {'< Previous Page'}
      </button>
      {page && <span className="page-number">{page}</span>}
      <button
        type="button"
        aria-label="Show nextApiPage search page"
        disabled={!nextApiPage}
        className={`pagination-btn ${nextApiPage ? 'active' : ''}`}
        onClick={handleNext}
      >
        {'Next Page >'}
      </button>
    </div>
  );
};

export default Pagination;
