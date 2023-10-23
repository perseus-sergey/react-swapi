import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { ChangeEvent } from 'react';

const CardFilter = (props: {
  query: string;
  setQuery: (filter: string) => void;
  submitSearch: () => void;
  isWrangInput: boolean;
}) => {
  const { query, setQuery, submitSearch, isWrangInput } = props;

  const cleanSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    setQuery('');
  };

  const inputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    if (!inputEl) return;

    setQuery(inputEl.value);
  };

  return (
    <fieldset className={classes.postFormFieldset}>
      <legend className={classes.postFormLegend}>Search planet</legend>

      <div className={classes.searchBlock}>
        <StyledInput
          badMessage="Minimum 2 characters!"
          isWrang={isWrangInput}
          value={query}
          placeholder="Search..."
          onChange={(e) => inputChanged(e)}
        />
        <StyledButton buttonType="cancel" onClick={cleanSearch} />
      </div>
      <StyledButton buttonType="submit" onClick={() => submitSearch()}>
        Search
      </StyledButton>
    </fieldset>
  );
};

export default CardFilter;
