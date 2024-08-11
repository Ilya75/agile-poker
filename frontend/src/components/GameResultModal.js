import { useEffect, useRef, useContext, useState } from "react";
import { GameContext } from "../store/game-context"
import Button from "./Button";
import Modal from './Modal';

import "./GameResultModal.css";

const GameResultModal = ({showModal, closeDialogHandler}) => {
    const gameCtx = useContext(GameContext);
    const [showDialog, setShowDialog] = useState(showModal);
    console.log("GameResult ",showDialog);
    const gameScore = (gameCtx.users.reduce ((totalScore, user) => totalScore + user.card, 0) / gameCtx.users.length).toFixed(2);

      return (
        <Modal show={showModal} onCancel={closeDialogHandler} 
            header="Game Results" contentClass="results__modal-content" footerClass="results__modal-actions" 
            footer={<Button onClick={closeDialogHandler}>Close</Button>}>
            <div className='results-container'>
                <p className="total-row">Game Score: {gameScore}</p>
                <div className="list-container">
                    <ul className="styled-list">{gameCtx.users.map((user) => (
                          <li key={user.userName}>{user.userName} - {user.card}</li>
                    ))}
                    </ul>
                </div>
            </div>
        </Modal>
      );
};


export default GameResultModal;

