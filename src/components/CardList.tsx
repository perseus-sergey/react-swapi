import { ICardData } from '../types';
import Card from './Card';
import './CardList.css';
import { CARD_PER_PAGE } from '../commons/constants';
import { Outlet } from 'react-router-dom';
import Pagination from './Pagination';
import { Loader } from './UI/loader/Loader';
import { useSearchEndpointQuery } from '../store/api/api';
import { useAppSelector } from '../store/store';

const CardList = () => {
  // const [searchParams] = useSearchParams();
  const query = useAppSelector((state) => state.searchReducer.searchQuery);
  const page = useAppSelector((state) => state.pageNumberReducer.pageNumber) || 1;
  // const page = Number(searchParams.get('page')) || 1;

  const { isLoading, isFetching, error, data } = useSearchEndpointQuery({ text: query, page });

  if (isLoading) return <Loader />;

  if (error && error instanceof Error) return <h2>Sorry. Something went wrong. {error.message}</h2>;

  if (!data.count || !data.results[0].name)
    return <h1 className="h1-title">Planets not found 👀 🤷</h1>;

  return (
    <>
      {data && data.count ? <h4>Results: {data.count}</h4> : ''}
      <h1 className="h1-title">Planets List</h1>
      <div className="content">
        <section className="card-list">
          <Pagination previousApiPage={data.previous} nextApiPage={data.next} />

          {(isFetching || isLoading) && <Loader />}

          <div className="cards-wrapper">
            {data.results.map((card: ICardData, indx: number) => (
              <Card index={indx + 1 + (page - 1) * CARD_PER_PAGE} key={card.name} cardData={card} />
            ))}
          </div>
        </section>
        <section className="card-detail">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default CardList;
