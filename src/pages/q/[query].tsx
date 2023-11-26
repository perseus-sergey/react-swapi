import CardList from '../../components/CardList';

import { searchEndpoint, getRunningQueriesThunk } from '../../store/planetApi';

import { wrapper } from '../../store/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const q = context.params?.query;
  const page = context.params?.page;
  if (typeof q === 'string' && typeof page === 'string') {
    store.dispatch(searchEndpoint.initiate({ text: q, page }));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default function Planet() {
  return <CardList />;
}
