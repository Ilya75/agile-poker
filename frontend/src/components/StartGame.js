import React, { useState, useReducer, useCallback, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import  Input  from './FormElements/Input';
import Button from './FormElements/Button';
import { GameContext } from '../store/game-context';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_CHECKBOX
} from './Utils/validators';

import { loginUser } from '../api/api';

import "./StartGame.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const StartGame = ({ gameId }) => {
 /* const [gameName, setGameName] = useState(gameId);
  const [userName, setUserName] = useState('');
  const [isLead, setIsLead] = useState(false);*/
  const gameCtx = useContext(GameContext);
  const [gameName, setGameName] = useState(''); 

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      gameName: {
        value: gameName,
        isValid: false
      },
      userName: {
        value: '',
        isValid: false
      },
      isLead: {
        value: "false",
        isValid: true
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);


  useEffect( () => {
    const fetchGameName = async () => {
      if (gameId && gameId.length > 0) {
        const response = await gameCtx.onGetGameById(gameId);
        setGameName(response.game.gameName);
        dispatch({
          type: 'INPUT_CHANGE',
          value: response.game.gameName,
          isValid: true,
          inputId: "gameName"
        });
      }
    }
    fetchGameName();
  }, [gameCtx, gameId])


  const gameSubmitHandler = async event => {
    event.preventDefault();
    
    const { gameName, userName, isLead } = formState.inputs;
    const request = {gameName: gameName.value, userName: userName.value, isLead: isLead.value};

    gameCtx.onLoginUser(request);

  };

  return (
    <div className="login">
      <p>To start the new game please fill this form out:</p>
      <form className="login-form" onSubmit={gameSubmitHandler} >
          <Input
              id="gameName"
              element="input"
              type="text"
              label="Game Name"
              value={gameName}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a game name."
              onInput={inputHandler}
              valid={gameName&&gameName.length>0}
            />

            <Input
              id="userName"
              element="input"
              type="text"
              label="Enter Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />

            <Input
              id="isLead"
              element="input"
              type="checkbox"
              label="Do you want to lead the game?"
              validators={[VALIDATOR_CHECKBOX()]}
              errorText="Please select checkbox if you want to lead the game"
              onInput={inputHandler}
              valid={true}
              value="false"
            />
          
              <Button type="submit" disabled={!formState.isValid}>
                Join Game
              </Button>
         </form>
    </div>
  );
};

export default StartGame;