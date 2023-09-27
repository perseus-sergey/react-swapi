import { IFilter } from '../types';
import StyledInput from './UI/input/StyledInput';
import Select from './UI/select/Select';

const CardFilter = (props: {
  filter: { sort: string; query: string };
  setFilter: (filter: IFilter) => void;
}) => {
  const { filter, setFilter } = props;

  return (
    <div>
      <StyledInput
        value={filter.query}
        placeholder="Search..."
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <Select
        value={filter.sort}
        changeCallback={(selectedSearch) => setFilter({ ...filter, sort: selectedSearch })}
        defaultValue="Sort By"
        options={[
          { value: 'title', name: 'Title' },
          { value: 'description', name: 'Description' },
        ]}
      />
    </div>
  );
};

export default CardFilter;
