import { StyledInput } from './UI/input/StyledInput';
import classes from './CardFilter.module.css';
import { StyledButton } from './UI/button/StyledButton';
import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-router-dom';
import { SEARCH_MIN_LENGTH } from '../commons/constants';

type Props = {
  query: string;
  setQuery: (filter: string) => void;
};

const CardFilter = (props: Props) => {
  const { query, setQuery } = props;
  const [isWrongInputSearch, setIsWrongInputSearch] = useState(false);

  const cleanSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery('');
  };

  const inputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    if (!inputEl) return;

    setQuery(inputEl.value);
  };

  const submitSearch = async () => {
    console.log('🚀 ~ file: App.tsx:28 ~ submitSearch ~ submitSearch:', 'submitSearch');
    if (isSearchWrong()) {
      setIsWrongInputSearch(true);
      return;
    }
    // if (!searchParams.get('page'))
    //   setSearchParams((params) => {
    //     params.set('page', '1');
    //   });
    // fetchPosts(query);
  };

  const isSearchWrong = () => {
    const { length } = query.trim();
    return length !== 0 && length < SEARCH_MIN_LENGTH;
  };

  return (
    <Form
      // action="/search"
      role="search"
      id={classes.searchForm}
      name="search-form"
      onSubmit={submitSearch}
    >
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
            onChange={(e) => inputChanged(e)}
          />
          <StyledButton aria-label="Clean search value" buttonType="cancel" onClick={cleanSearch} />
        </div>
        <StyledButton aria-label={`Search ${query}`} buttonType="submit" type="submit">
          Search
        </StyledButton>
      </fieldset>
    </Form>
  );
};

export default React.memo(CardFilter);
