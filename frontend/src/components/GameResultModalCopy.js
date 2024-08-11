import { useEffect, useRef, useContext, useState } from "react";
import { GameContext } from "../store/game-context"
import Button from "./Button";
import Modal from './Modal';

import "./GameResultModal.css";

const GameResultModalCopy = () => {
    const gameCtx = useContext(GameContext);
    const [showDialog, setShowDialog] = useState(false);
    const [modalShowed, setModalShowed] = useState(false);
    const gameScore = (gameCtx.users.reduce ((totalScore, user) => totalScore + user.card, 0) / gameCtx.users.length).toFixed(2);

    useEffect( () => {
        if (gameCtx.reveal === true) { 
            if (!showDialog && !modalShowed) {
                setModalShowed(true);
                setShowDialog(true);
                // setTimeout( () => {
                //     closeDialogHandler();
                // }, 1500);
                console.log(gameCtx.reveal);
            }
        } else {
            if (modalShowed) setModalShowed(false);
            if (showDialog) setShowDialog(false);
        }
      }, [gameCtx.reveal])

      const closeDialog = () => {
        setModalShowed(true);
        setShowDialog(false);

        // setTimeout( () => {
        //     closeDialogHandler();
        // }, 500);
      }

      const closeDialogHandler = () => {
        closeDialog();
      }


      return (
        <Modal show={showDialog} onCancel={closeDialogHandler} 
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


export default GameResultModalCopy;

