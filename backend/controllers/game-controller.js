const { uuid } = require('uuidv4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

DUMMY_GAMES = [
    {
        id: "gm1",
        gameName: "Game-1",
        reveal: false,
        users: [
            {
                userName: "Test User",
                isLead: false,
                card: 0
            },
        ]
    },
    {
        id: "gm2",
        gameName: "Panda",
        reveal: false,
        users: [
            {
                userName: "Ilya",
                isLead: false,
                card: 0
            },
        ]
    }
]

const getGameById = (req, res, next) => {
    const gameId = req.params.gameId; // { pid: 'p1' }
  
    const game = DUMMY_GAMES.find(game => {
      return game.id === gameId;
    });
  
    if (!game) {
        return next (
          new HttpError(`Could not find a game with such id: ${gameId}`, 404)
        );
    }
  
    res.json({ game }); 
};

const getAllGames = (req, res, next) => {
    return res.json(DUMMY_GAMES);
}

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { gameName, userName, isLead, card } = req.body;

    let game = DUMMY_GAMES.find(game => {
        return game.gameName === gameName;
    }); 

    if (!game) {
        game = { id: uuid(), gameName, reveal: false, users : [] }
        DUMMY_GAMES.push(game);
    }

    const userExists = game.users.find( user => {
        return user.userName == userName;
    });

    if (!userExists)
        game.users.push({userName, isLead, card});

    res.status(201).json({user: userName, isLead: isLead, game});
 };

 const logoutUser = async (req, res, next) => {

    const gameId = req.params.gameId;
    const userName = req.params.username;

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    }); 

    if (!game) {
        return next(new HttpError(`Could not find a game with such id: ${gameId}`, 404));
    }

    const indx = game.users.findIndex( user => {
        return user.userName == userName;
    });

    if (indx < 0) {
        return next(new HttpError(`Could not find the user: ${userName} in the game ${gameId}`, 404));
    }

    game.users.splice(indx, 1);

    const ret = {user: '', game};

    res.status(200).json(ret);
 };

 
 const userCardSelected = (req, res, next) => {
    const gameId = req.params.gameId;
    const userName = req.params.username;
    const { card } = req.body;

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    }); 

    if (!game) {
        return next(new HttpError(`Could not find a game with such id: ${gameId}`, 404));
    }

    const user = game.users.find( user => {
        return user.userName == userName;
    });

    if (!user) {
        return next(HttpError(`Could not find the user: ${userName} in the game ${gameid}`, 404));
    }

    user.card = card;

    const ret = {user: userName, isLead: user.isLead, card: user.card};

    res.status(200).json(ret);
 }


 const revealCards = (req, res, next) => {
    const gameId = req.params.gameId;
    const userName = req.params.username;

    console.log(`Reveal cards requested by ${userName}`);

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    }); 

    if (!game) {
        return next(new HttpError(`Could not find a game with such id: ${gameId}`, 404));
    }

    game.reveal = !game.reveal;

    res.status(200).json(game);
 };

 ///
 ///  Reset Game set card value to 0 to all users
 ///
 const resetGame = (req, res, next) => {
    const gameId = req.params.gameId;
    const userName = req.params.username;

    console.log(`Reset Game requested by ${userName}`);

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    });

    if (!game) {
        return next(HttpError(`Unable to reset the game: ${gameName}`, 404));
    }

    for (user of game.users) {
        user.card = 0;
    }

    res.status(200).json(game);
 };

 ///
 ///  Clean Game - remove all users except requestor
 ///
 const cleanGame = (req, res, next) => {
    const gameId = req.params.gameId;
    const userName = req.params.username;

    console.log(`Clean Game requested by ${userName}`);

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    });

    if (!game) {
        return next(HttpError(`Unable to reset the game: ${gameName}`, 404));
    }

    game.users = game.users.filter( user => user.userName === userName);

    res.status(200).json(game);
 };

 const deleteGame = (req, res, next) => {
    res.status(200).json({ result: "Not implemented yet" });
 };

 const realtimeStatus = (req, res, next) => {

    const gameId = req.params.gameId;

    const game = DUMMY_GAMES.find(game => {
        return game.id === gameId;
    }); 

    if (!game) {
        return next(new HttpError(`Could not find a game with such id: ${gameId}`, 404));
    }

    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Content-Encoding": "none",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PATCH, DELETE'
    });

    setInterval(() => {
        //const ret = {game};
        res.write(
            "data:" +
            JSON.stringify({game})
        );
        res.write("\n\n");
      }, 1000);
 };

  exports.getGameById = getGameById;
  exports.getAllGames = getAllGames;
  exports.loginUser = loginUser;
  exports.logoutUser = logoutUser;
  exports.userCardSelected = userCardSelected;
  exports.revealCards = revealCards;
  exports.resetGame = resetGame;
  exports.cleanGame = cleanGame;
  exports.deleteGame = deleteGame;
  exports.realtimeStatus = realtimeStatus;



