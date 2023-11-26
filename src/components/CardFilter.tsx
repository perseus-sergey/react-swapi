import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const CardFilter = () => {
  const [query, setQuery] = useState('');
  const route = useRouter();

  const submitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(`/q/${query}`);
  };

  return (
    <form role="search" id={classes.searchForm} name="search-form" onSubmit={submitSearch}>
      <fieldset className={classes.postFormFieldset}>
        <legend className={classes.postFormLegend}>Search planet</legend>

        <div className={classes.searchBlock}>
          <StyledInput
            id="q"
            name="q"
            badMessage="Minimum 2 characters!"
            isWrang={false}
            // isWrang={isWrongInputSearch}
            value={query}
            aria-label="Search input"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <StyledButton
            aria-label="Clean search value"
            buttonType="cancel"
            type="button"
            onClick={() => setQuery('')}
          />
        </div>
        <StyledButton aria-label={`Search ${query}`} buttonType="submit" type="submit">
          Search
        </StyledButton>
      </fieldset>
    </form>
  );
};

export default CardFilter;
