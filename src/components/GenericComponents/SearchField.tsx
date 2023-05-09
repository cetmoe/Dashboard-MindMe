import React, { useState } from 'react';

interface ISearcField {
  handleClick: (arg: string) => void;
  children?: React.ReactNode;
}

const SearchField = ({ handleClick }: ISearcField) => {
  const [searchValue, setSearchValue] =
    useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(e?.currentTarget.value);
  };

  return (
    <div>
      <input onChange={handleChange} type='search'></input>
      <button onClick={() => handleClick(searchValue)}>
        Search
      </button>
    </div>
  );
};

export default SearchField;
