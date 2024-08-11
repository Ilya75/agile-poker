/*
    Copyright 2024 Ilya Ovchelupov
*/
'option strict';
import React, { createContext, useState, useCallback } from 'react';

export const GameContext = createContext({
    gameId: "",
    gameName: "", /* current game name */
    reveal: false,  /* should we show cards or not */
    user: "",  /* user is logged or not */
    isLead: false,
    users: [ ],
    onSetGameName: () => {},
    onGetGameById: () => {},
    onLoginUser : () => {},
    onLogoutUser : () => {},
    onCardSelected: () => {},
    onGameStatus: () => {},
    onShowCards: () => {},
    onResetGame: () => {},
    onCleanGame: () => {}
});

export default function GameContextProvider({children}) {

    const [gameInfo, setGameInfo] = useState({
        gameId: "",
        gameName: "",
        reveal: false,
        user: "",
        isLead: false,
        users: [ ]
      });

      const baseUrl = `http://${process.env.REACT_APP_PT_API_SERVICE_SERVICE_HOST}`;

      const handleGetGameById = useCallback( async (id) => {

        try {
          const response = await fetch(`${baseUrl}/api/games/${id}`,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
        }); 

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const result = await response.json(); 
        return result;
        
      } catch (error) {
        console.log(error.message);
      }

      }, []);

      function handleGameName( gameName ) {

        const updGame = { gameName: gameName, user: "", users: [] };
        setGameInfo((prevGameInfo) => ({
          ...prevGameInfo,
          ...updGame
        }));
      }
    
      const handleLoginUser = useCallback( async (userData) => {
        //console.log(userData);
        try {
            const response = await fetch(`${baseUrl}/api/games`,
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                gameName: userData.gameName,
                userName: userData.userName,
                isLead: userData.isLead,
                card: 0,
              }),
          }); // returns a promise, which will be handled by .then
          if (!response.ok) {
            throw new Error('Something went wrong');
          }

          const result = await response.json(); 
          
          setGameInfo((prevGameInfo) => {

            const updGameInfo  = {...prevGameInfo};
            
            updGameInfo.gameId   = result.game.id; 
            updGameInfo.gameName = result.game.gameName;
            updGameInfo.user = result.user;
            updGameInfo.isLead = result.isLead;
            updGameInfo.users = result.game.users;
          
            return ({...prevGameInfo,  ...updGameInfo});
          });

        } catch (error) {
          console.log(error.message);
        }
      }, []);

      const handleLogoutUser  = useCallback( async (userData) => {

        try {
          const response = await fetch(`http://${baseUrl}/api/games/logout/${userData.gameId}/${userData.user}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            }
        }); // returns a promise, which will be handled by .then
        if (!response.ok) {
          throw new Error('Error logout user');
        }

        const result = await response.json(); 
        if (result) {
            setGameInfo((prevGameInfo) => {

                const updGameInfo  = {...prevGameInfo};
                const users = updGameInfo.users;

                updGameInfo.gameName = "";
                updGameInfo.user = "";
                updGameInfo.isLead = false;
                updGameInfo.users = [];

                return ({...prevGameInfo,  ...updGameInfo});

              }); 
         }

      } catch (error) {
        console.log(error.message);
      }
    }, []);


    const handleUserCardSelected  = useCallback( async (userData) => {

        try {
              const response = await fetch(`${baseUrl}/api/games/card/${userData.gameId}/${userData.loggedUser}`,
                {
                  method: "PATCH",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    card: userData.value
                  })
              }); // returns a promise, which will be handled by .then
              if (!response.ok) {
                throw new Error('Error updating card!');
              }

              const result = await response.json(); 

              setGameInfo((prevGameInfo) => {
                  const updGameInfo  = {...prevGameInfo};
                  const users  = updGameInfo.users;
                  const updatedUserIndex = users.findIndex(
                    (user) => user.userName === result.user
                  );
                  const user = {
                    ...users[updatedUserIndex],
                  };
                  user.card = result.card;
                  users[updatedUserIndex] = user;
                  return ({...prevGameInfo,  ...updGameInfo});
                });

              } catch (error) {
                console.log(error.message);
             }
    
      }, []);

      const handleGameStatus = ({game}) => {
        
          if (game !== null) {
                  setGameInfo((prevGameInfo) => {
                    if (JSON.stringify(prevGameInfo.users) === JSON.stringify(game.users) && prevGameInfo.reveal === game.reveal) 
                      return prevGameInfo;

                    const updGameInfo  = {...prevGameInfo};
                    updGameInfo.reveal = game.reveal;
                    updGameInfo.users = game.users;
                    return ({...prevGameInfo,  ...updGameInfo});
                  });
          }
      }

      const handleShowCards =  useCallback( async (userData) => {
        const response = await fetch(`${baseUrl}/api/games/reveal/${userData.gameId}/${userData.user}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            }
        }); // returns a promise, which will be handled by .then
        if (!response.ok) {
          console.error('Error revealing cards in the Game!');
        }
      }, []);

      const handleResetGame = useCallback( async (userData) => {
        const response = await fetch(`${baseUrl}/api/games/reset/${userData.gameId}/${userData.user}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            }
        }); // returns a promise, which will be handled by .then
        if (!response.ok) {
          console.error('Error cleaning the game!');
        }
      }, []);

      const handleCleanGame = useCallback( async (userData) => {
        const response = await fetch(`${baseUrl}/api/games/clean/${userData.gameId}/${userData.user}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            }
        }); // returns a promise, which will be handled by .then
        if (!response.ok) {
          console.error('Error cleaning the game!');
        }
      }, []);

      var gameCtxState = {
        gameId: gameInfo.gameId,
        gameName: gameInfo.gameName,
        reveal: gameInfo.reveal,
        user: gameInfo.user,
        isLead: gameInfo.isLead,
        users: gameInfo.users,
        onGetGameById: handleGetGameById,
        onSetGameName: handleGameName, 
        onLoginUser: handleLoginUser,
        onLogoutUser: handleLogoutUser,
        onCardSelected: handleUserCardSelected,
        onGameStatus: handleGameStatus,
        onShowCards: handleShowCards,
        onResetGame: handleResetGame,
        onCleanGame: handleCleanGame
      }

      return <GameContext.Provider value={gameCtxState}>
        {children}
      </GameContext.Provider>
}