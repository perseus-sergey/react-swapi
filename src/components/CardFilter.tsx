import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import { FormEvent, memo, useState } from 'react';
import { Form, useSearchParams } from 'react-router-dom';
import { SEARCH_MIN_LENGTH } from '../commons/constants';
import ErrorButton from './ErrorButton';
import { useAppDispatch, useAppSelector } from '../store/store';
import { searchSlice } from '../store/slice/searchSlice';
import { pageNumberSlice } from '../store/slice/pageSlice';
import StyledInput from './UI/input/StyledInput';

const CardFilter = () => {
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const query = useAppSelector((state) => state.searchReducer.searchQuery);
  const { setQuery } = searchSlice.actions;
  const { setQuery: setPage } = pageNumberSlice.actions;
  const dispatch = useAppDispatch();

  const cleanSearch = () => {
    setSearchValue('');
    dispatch(setPage({ pageNumber: 1 }));
    setIsWrongInputSearch(false);
  };

  const inputChanged = (value: string) => {
    setSearchValue(value);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    if (!isSearchWrong()) {
      dispatch(setQuery({ text: searchValue }));
      dispatch(setPage({ pageNumber: 1 }));
      setIsWrongInputSearch(false);
      return;
    }
    setIsWrongInputSearch(true);
    e.preventDefault();
  };

  const isSearchWrong = () => {
    const { length } = searchValue.trim();
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
              value={searchValue}
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
          <StyledButton
            aria-label={`Search ${query}`}
            buttonType="submit"
            type="submit"
            role="submit"
            name="search"
          >
            Search
          </StyledButton>
        </fieldset>
      </Form>
      <ErrorButton />
    </>
  );
};

export default memo(CardFilter);
