/*
    Copyright 2024 Ilya Ovchelupov
*/

import React from 'react';
import { useParams } from 'react-router-dom';

import MainNavigation from '../components/Navigation/MainNavigation';
import Dashboard from '../components/Dashboard';

const DashBoardPage = () => {

    const params = useParams();
    const gameId = params.gameId;

    return (
        <div className="app">
            <MainNavigation />
            <Dashboard gameId = {gameId}  />
        </div>
    )
}


export default DashBoardPage;