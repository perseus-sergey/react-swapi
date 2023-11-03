import React from 'react';
import { useSearchParams } from 'react-router-dom';
// import { getCurrentUrl, getPageNumber } from '../commons/utils';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = (props: Props) => {
  const { previousApiPage, nextApiPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // const navigate = useNavigate();
  // const currentUrl = getCurrentUrl(window.location.href);
  // const getPaginationPage = (paginationUrl = '') => {
  //   const toPageNumber = paginationUrl ? getPageNumber(paginationUrl, 'remote') : 1;
  //   console.log('🚀 ~ file: Pagination.tsx:16 ~ getPaginationPage ~ toPageNumber:', toPageNumber);
  //   navigate(`${currentUrl}/page/${toPageNumber}`);
  // };
  function handlePrev() {
    setSearchParams((params) => {
      params.set('page', `${Math.max(1, page - 1)}`);
      return params;
    });
  }

  function handleNext() {
    setSearchParams((params) => {
      params.set('page', `${page + 1}`);
      return params;
    });
  }

  return (
    <div className="pagination">
      <button
        type="button"
        aria-label="Show previousApiPage search page"
        disabled={!previousApiPage}
        className={`pagination-btn ${previousApiPage ? 'active' : ''}`}
        // onClick={previousApiPage ? () => getPaginationPage(previousApiPage || '') : undefined}
        onClick={handlePrev}
      >
        {'< Previous Page'}
      </button>
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
