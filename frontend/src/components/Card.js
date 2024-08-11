import React from 'react';
import './Card.css';

const Card = ({className, number, onSelect}) => {
  
  return (
    <div className={className} onClick={() => onSelect(number)}>
      {number}
    </div>
  );
};

export default Card;