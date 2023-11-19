import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from 'react-router-dom';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
import ErrorButton from './ErrorButton';
import { getUrlParam } from '../commons/utils';

const CardFilter = () => {
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  const [query, setQuery] = useState(getUrlParam('q'));

  const cleanSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery('');
  };

  const inputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    if (!inputEl) return;

    setQuery(inputEl.value);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    if (!isSearchWrong()) {
      setIsWrongInputSearch(false);
      return;
    }
    setIsWrongInputSearch(true);
    e.preventDefault();
  };

  const isSearchWrong = () => {
    const { length } = query.trim();
    return length !== 0 && length < SEARCH_MIN_LENGTH;
  };

  return (
    <>
      <Form role="search" id={classes.searchForm} name="search-form" onSubmit={submitSearch}>
        <fieldset className={classes.postFormFieldset}>
          <legend className={classes.postFormLegend}>Search planet</legend>

          <div className={classes.searchBlock}>
            <StyledInput
              id="q"
              name="q"
              badMessage="Minimum 2 characters!"
              isWrang={isWrongInputSearch}
              value={query}
              aria-label="Search input"
              placeholder="Search..."
              // defaultValue={q}
              onChange={(e) => inputChanged(e)}
            />
            <StyledButton
              aria-label="Clean search value"
              buttonType="cancel"
              type="button"
              onClick={cleanSearch}
            />
          </div>
          <StyledButton aria-label={`Search ${query}`} buttonType="submit" type="submit">
            Search
          </StyledButton>
        </fieldset>
      </Form>
      <ErrorButton />
    </>
  );
};

export default React.memo(CardFilter);
