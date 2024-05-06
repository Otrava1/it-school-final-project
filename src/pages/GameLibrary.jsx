// import React, { useEffect, useState } from 'react';
// import { Layout } from '../components/Layout';
// import { getGamesEndpoint } from '../api/endpoint';
// import { Container } from 'react-bootstrap';
// import { GameCardList } from '../components/GameCardList';
// import { useFetch } from '../utils/hooks/useFetch';
// // import { GameCardList } from '../components/GameCardList'

// export function About() {
//   const gamesEndpoint = getGamesEndpoint();

//   const gamesData = useFetch(gamesEndpoint);
//   console.log(gamesData);


//   return (
//     <>
//       {/* Instanțiem Layout, dandu-i copii.*/}
//       <Layout>
//         <h1 className="color">Games</h1>
//             <Container>
//                 {/* Afisez stirile despre tehnologie */}
//                 {/* <GameCardList gameList = {gamesData} /> */}
//             </Container>
//       </Layout>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useFetch } from '../utils/hooks/useFetch';
import { Layout } from '../components/Layout';
import { GameCardList } from '../components/GameCardList';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import { ToastContainer } from 'react-toastify';

export const GameLibrary = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const apiKey = '0f12a281470b42668b45e0a6e06eafa1';
    const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=100`;

    const fetchGames = async () => {
        try {

            const data = await useFetch(url);

            setGames(data.results);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchGames();
    }, [apiKey]);

    if (loading) {
        return <div className='loader'><div className='animated-loader'></div></div>;
    }

    if (error) {
        return <div className='error-message'>Error: {error.message}</div>;
    }

    return (
      <Layout>
        <Container className='gamegrid'>
        <SearchBar className='searchbar' />
        <GameCardList gameList = {games}/>
        </Container>
        <ToastContainer
position="top-center"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        
        </Layout>
    );
};
