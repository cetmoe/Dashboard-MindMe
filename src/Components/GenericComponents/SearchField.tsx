import React, { useState } from 'react';

interface ISearchParams {
  given?: string;
  family?: string;
}

interface ISearchField {
  handleClick: ({ given, family }: ISearchParams) => void;
  children?: React.ReactNode;
}

const SearchField = ({ handleClick }: ISearchField) => {
  const [searchValues, setSearchValues] =
    useState<ISearchParams>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValues({
      ...searchValues,
      [e.target.id]: e.target.value,
    });

    console.log({
      ...searchValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='row g-3 m-4'>
      <div className='col'>
        <input
          onChange={handleChange}
          className='form-control'
          id='given'
          type='search'
          placeholder='First name'
        />
      </div>
      <div className='col'>
        <input
          onChange={handleChange}
          className='form-control'
          id='family'
          type='search'
          placeholder='Last name'
        />
      </div>

      <div className='col'>
        <button
          onClick={() => handleClick(searchValues)}
          className='btn btn-outline-primary w-100'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchField;
