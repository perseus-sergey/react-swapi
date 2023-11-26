import CardDetail from '../../components/CardDetail';

import { getPlanet, getRunningQueriesThunk } from '../../store/planetApi';

import { wrapper } from '../../store/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id;
  if (typeof id === 'string') {
    store.dispatch(getPlanet.initiate(id));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default function Planet() {
  return <CardDetail />;
}
