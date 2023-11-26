import { useRouter } from 'next/router';
import style from './Pagination.module.css';

type Props = {
  previousApiPage: string | null;
  nextApiPage: string | null;
};

const Pagination = ({ previousApiPage, nextApiPage }: Props) => {
  const router = useRouter();

  const page = Number(router.query.page) || 1;

  const handlePrev = () => {
    router.push(`/page/${Math.max(1, page - 1)}`);
  };

  const handleNext = () => {
    router.push(`/page/${page + 1}`);
  };

  return (
    <div className={style.pagination}>
      <button
        type="button"
        aria-label="Show previousApiPage search page"
        disabled={!previousApiPage}
        className={`${style.paginationBtn} ${previousApiPage ? style.active : ''}`}
        onClick={handlePrev}
      >
        {'< Previous Page'}
      </button>
      {page && <span className={style.pageNumber}>{page}</span>}
      <button
        type="button"
        aria-label="Show nextApiPage search page"
        disabled={!nextApiPage}
        className={`${style.paginationBtn} ${nextApiPage ? style.active : ''}`}
        onClick={handleNext}
      >
        {'Next Page >'}
      </button>
    </div>
  );
};

export default Pagination;
