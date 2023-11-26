import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = ({ previousApiPage, nextApiPage }: Props) => {
  const router = useRouter();
  const urlPath = usePathname();

  const page = Number(router.query.page) || 1;

  const handlePrev = () => {
    const url = urlPath.replace(/page=(\d*)/, (_, pageNum) => `page=${Math.max(1, pageNum - 1)}`);
    router.push(url);
    `${Math.max(1, page - 1)}`;
  };

  const handleNext = () => {
    const url = urlPath.replace(/page=(\d*)/, (_, pageNum) => `page=${pageNum + 1}`);
    router.push(url);
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
