/*
    Copyright 2024 Ilya Ovchelupov
*/

import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider , Route} from 'react-router-dom';
import './App.css';
import DashBoardPage from './pages/DashboardPage';
import LogoutPage from './pages/LogoutPage';
import GameContextProvider  from './store/game-context';
import RootLayout from './pages/RootLayout';


const router = createBrowserRouter([
   { path: '/', element: <RootLayout />,
        children: [
          {path: "/", element:<DashBoardPage/>},
          {path: "/:gameId", element:<DashBoardPage/>},
          {path: "/logout", element:<LogoutPage/>},
        ]
    },
 ]);

function App() {

  return (
    <GameContextProvider>
      <RouterProvider router={router} />
    </GameContextProvider>
  );
}
export default App;