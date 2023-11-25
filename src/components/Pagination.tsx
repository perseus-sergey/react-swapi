import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { pageNumberSlice } from '../store/slice/pageSlice';
import { useAppDispatch } from '../store/store';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = (props: Props) => {
  const dispatch = useAppDispatch();
  const { setQuery } = pageNumberSlice.actions;

  const { previousApiPage, nextApiPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePrev = () => {
    const prevPageNum = Math.max(1, page - 1);

    dispatch(setQuery({ pageNumber: prevPageNum }));
    setSearchParams((params) => {
      params.set('page', `${prevPageNum}`);
      return params;
    });
  };

  const handleNext = () => {
    const nextPageNum = page + 1;
    dispatch(setQuery({ pageNumber: nextPageNum }));
    setSearchParams((params) => {
      params.set('page', `${nextPageNum}`);
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
