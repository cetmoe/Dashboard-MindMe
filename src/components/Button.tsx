import React from 'react';

interface IButton {
  text: String;
  handleClick: () => void;
  children?: React.ReactNode;
}

const Button = ({ text, handleClick }: IButton) => {
  return (
    <div onClick={() => handleClick()} className='button'>
      {text}
    </div>
  );
};

export default Button;
