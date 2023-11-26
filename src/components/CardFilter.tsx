import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { useState } from 'react';

const CardFilter = () => {
  const [query, setQuery] = useState('');

  return (
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
  );
};

export default CardFilter;
