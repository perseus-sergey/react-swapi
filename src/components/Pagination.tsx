import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import style from './Pagination.module.css';

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
    <div className={style.pagination}>
      <button
        type="button"
        aria-label="Show previousApiPage search page"
        disabled={!previousApiPage}
        className={`${style.paginationBtn} ${previousApiPage ? 'active' : ''}`}
        onClick={handlePrev}
      >
        {'< Previous Page'}
      </button>
      {page && <span className={style.pageNumber}>{page}</span>}
      <button
        type="button"
        aria-label="Show nextApiPage search page"
        disabled={!nextApiPage}
        className={`${style.paginationBtn} ${nextApiPage ? 'active' : ''}`}
        onClick={handleNext}
      >
        {'Next Page >'}
      </button>
    </div>
  );
};

export default Pagination;
