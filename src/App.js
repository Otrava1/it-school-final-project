import React from 'react';
import './style.css';
import './pages/Home.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { GameLibrary } from './pages/GameLibrary';
import { Page404 } from './pages/Page404';
import { Collection } from './pages/Collection';
import { CollectionProvider } from './collection/context';
import { GameDetails } from './components/GameDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Page404 />,
  },
  {
    path: '/library',
    element: <GameLibrary />,
  },
  {
    path: '/collection',
    element: <Collection />
  },
  {
    path: '/details/:gameId',
    element: <GameDetails />,
  }
]);

export default function App() {
  return (
    <>
    <CollectionProvider>
      <RouterProvider router={router} />
      </CollectionProvider>
    </>
  );
}
