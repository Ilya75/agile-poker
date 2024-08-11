import React, {useContext, useState} from 'react';
import Card from './Card';
import { GameContext } from "../store/game-context";
import './Table.css';
import Button from "./Button";
import GameResultModal from './GameResultModal';

import User from './User';

const Table = ({ onCardSelect }) => {
  const [showDialog, setShowDialog] = useState(false);
  const gameCtx = useContext(GameContext);
  const gameId = gameCtx.gameId;
  const loggedUser = gameCtx.user;
  const users = gameCtx.users;
  let gameScore = 0;
  if (gameCtx.reveal) {
      gameScore = (gameCtx.users.reduce ((totalScore, user) => totalScore + user.card, 0) / gameCtx.users.length).toFixed(2);
  }

  const handleClick = (value) => {
    gameCtx.onCardSelected({gameId,loggedUser, value});
  };

  const showDialogHandler = (event) => {
    setShowDialog(true);
    console.log("clicked!", showDialog);
  }

  const closeDialogHandler = (event) => {
    setShowDialog(false);
  }

    return (
      <>
       { users.length > 0  &&
      <div className="table">
        { users.map((user, index) => (
          <User key={index} name={user.userName} card={user.card} />
        ))}
      </div> } 
      <GameResultModal showModal={showDialog} closeDialogHandler={closeDialogHandler} />
      
      { gameCtx.reveal && 
      <div className="dashboard-centered">
           <Button onClick={showDialogHandler}>Game Score: {gameScore}</Button>
      </div>
       }
       <div className="cards">
          {[1, 2, 3, 5, 8, 13].map((number) => (
            <Card className="card card-not-selected" key={number} number={number} onSelect={handleClick} />
          ))}
       </div>
       </>
    );
  };

export default Table;