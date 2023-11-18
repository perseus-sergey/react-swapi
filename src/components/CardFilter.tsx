import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
import ErrorButton from './ErrorButton';
import { useGetAllQuery } from '../store/api';
// import { useAppDispatch, useAppSelector } from '../store';
// import { setQuery } from '../store/slice/searchSlice';

const CardFilter = () => {
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  // const query = useAppSelector((state) => state.searchReducer.searchQuery);
  // const dispatch = useAppDispatch();
  const { isLoading } = useGetAllQuery('');
  console.log('🚀 ~ file: CardFilter.tsx:17 ~ CardFilter ~ data:', isLoading);

  const [query, setQuery] = useState('');

  const cleanSearch = () => {
    // dispatch(setQuery({ text: '' }));
  };

  const inputChanged = (val: string) => {
    setQuery(val);
    // dispatch(setQuery({ text: val }));
  };

  const submitSearch = () => {
    if (!isSearchWrong()) {
      setIsWrongInputSearch(false);
      return;
    }
    setIsWrongInputSearch(true);
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
              onChange={(e) => inputChanged(e.target.value)}
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
