import React, { useContext} from 'react';
import { useParams } from 'react-router-dom';

import { GameContext } from "../../store/game-context"

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';

const MainNavigation = props => {

  const params = useParams();
  const gameName = params.gameName;
  const gameCtx = useContext(GameContext);
  let logged = false;
  if (gameCtx.user) logged = true;

  return (
    <React.Fragment>
      <MainHeader>
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h2 className="main-navigation__sm_title">Agile Poker</h2>
        <h1 className="main-navigation__title">
          { logged && <span>Game: "{gameCtx.gameName}"</span> }
        </h1>
        <nav className='main-navigation__header-nav'>
          { logged && <NavLinks /> }
        </nav> 
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
