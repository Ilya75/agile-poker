import { GameContext } from '../store/game-context';
import React,  {useContext} from 'react';
import Card from './Card';

import "./User.css";

const User = ({ name, card }) => {
    const gameCtx = useContext(GameContext);
  
    let cssName = "";
    const showCards = gameCtx.reveal;

    if (card !== 0) {
      cssName = "card-selected"
    } else {
      cssName = "card-not-selected";
    }

    if (gameCtx.user !== name && !showCards) {
      cssName += " card-back";
      card = "";
    } else {
      cssName += " card";
    }
    
   const handleSelect = (value) => {
      //console.log("Clicked:", value);
    }

    return (
      <div className="user">
        <h3 className='userName'>{name}</h3>
        <Card className={cssName} number={card} onSelect={handleSelect}  />
      </div>
    );
  };

export default User;