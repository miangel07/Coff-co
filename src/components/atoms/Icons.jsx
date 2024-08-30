import React from 'react';

const Icons = ({ img, className }) => {
  return (
    <img src={img} alt="icon" className={`sm:w-5 sm:h-5 ${className}`} />
  );
};

export default Icons;
