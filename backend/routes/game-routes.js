const express = require('express');
const { check } = require('express-validator');

const gameController = require('../controllers/game-controller');

const router = express.Router();

router.get('/:gameId', gameController.getGameById);
router.get('/', gameController.getAllGames);
router.get('/status/:gameId', gameController.realtimeStatus);

router.post(
  '/',
  gameController.loginUser
);

router.patch(
  '/card/:gameId/:username',
  gameController.userCardSelected
);

router.patch(
  '/reveal/:gameId/:username',
  gameController.revealCards
);

router.patch(
  '/reset/:gameId/:username',
  gameController.resetGame
);

router.patch(
  '/clean/:gameId/:username',
  gameController.cleanGame
);

router.patch(
  '/logout/:gameId/:username',
  gameController.logoutUser
);


router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
