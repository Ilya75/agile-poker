import React, {useContext, useState, useEffect } from "react";

import { GameContext } from "../store/game-context";
import Table from './Table';
import StartGame from './StartGame';
import InvitePlayersModal from "./InvitePlayersModal";
import Button from "./FormElements/Button";

import "./Dashboard.css";

const Dashboard = ({gameId}) => {

   const gameCtx = useContext(GameContext);
   const [showInvite, setShowInviteModal] = useState(false);
   const baseAPIUrl = `http://${process.env.REACT_APP_PT_API_SERVICE_SERVICE_HOST}`;
   const baseUIUrl = `http://${process.env.REACT_APP_PT_API_SERVICE_UI_HOST}`;
   let gameUrl = "";
   if (gameCtx.user?.length > 0) {
      gameUrl = `${baseUIUrl}/${gameCtx.gameId}`;
   }

   const updateGameStatus = (data) => {
    const parsedData = JSON.parse(data);
    gameCtx.onGameStatus(parsedData);
   }

   useEffect(() => {
      if (gameCtx.user?.length > 0) {
        console.log("channel started!");
        let gameId = gameCtx.gameId;
        const eventSource = new EventSource(`${baseAPIUrl}/api/games/status/${gameId}`);
        eventSource.onopen = () => console.log("Game channel opened");
        eventSource.onmessage = (e) => updateGameStatus(e.data);
        eventSource.onerror = (e) => console.log("Game channel error!");
      
        return () => {
          eventSource.close();
        };
    }
   }, [gameCtx.user])


     const onCardSelect = (value) => {
        console.log(value);
     }

     const invitePlayersHandler = (event) => {
        setShowInviteModal(true);
     }

     const closeInviteDialog = () => {
        setShowInviteModal(false);
     }
   
     return (
        <div className="dashboard">
          <div className="centered">
            { gameCtx.user?.length > 0 ? (
              <>
              <div className="dashboard-centered">
                <Button onClick={invitePlayersHandler}>Invite players</Button>
              </div>
              <InvitePlayersModal gameUrl={gameUrl} showModal={showInvite} closeDialogHandler={closeInviteDialog} />
              <Table onCardSelect={onCardSelect} />
              </>
          ) : (
            <StartGame gameId={gameId} />
          )}
          </div>
        </div>
      );

}

export default Dashboard;