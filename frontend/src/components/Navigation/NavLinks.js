import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Button from "../Button";
import { GameContext } from "../../store/game-context"

import "./NavLinks.css";
//import GameResultModal from '../GameResultModal';

const NavLinks = (props) => {

    const gameCtx = useContext(GameContext);
    const navigate = useNavigate();

    const logoutHandler = (event) => {
        gameCtx.onLogoutUser({gameId: gameCtx.gameId, user: gameCtx.user});
        navigate('/logout');
    }

    const showCardsHandler = (event) => {
        gameCtx.onShowCards({gameId: gameCtx.gameId, user: gameCtx.user});
    }

/*    const closeDialogHandler = () => {
        setModalShowed(true);
        //modalShowed.current = 'true';
        setShowResults(false);
     }*/

    const resetGameHandler = (evemt) => {
        gameCtx.onResetGame({gameId: gameCtx.gameId, user: gameCtx.user});
    }

    const cleanGameHandler = (evemt) => {
        gameCtx.onCleanGame({gameId: gameCtx.gameId, user: gameCtx.user});
    }

    return (
    <React.Fragment>
        <ul className="nav-links">
            {gameCtx.isLead === "true" && (<li>
                <Button onClick={showCardsHandler}> {gameCtx.reveal ? 'Hide Cards' : 'Reveal Cards'}</Button>
            </li>)}        
            {gameCtx.isLead === "true" && (<li>
                <Button onClick={resetGameHandler}>Reset Cards</Button>
            </li>)}        
            {gameCtx.isLead === "true" && (<li>
                <Button onClick={cleanGameHandler}>Clean Game</Button>
            </li>)}        
            <li>
                <Button onClick={logoutHandler}>Log out</Button>
            </li>
        </ul>
    </React.Fragment>
    )
}

export default NavLinks;