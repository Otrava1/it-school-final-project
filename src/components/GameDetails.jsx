import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from './Layout';
import { Container } from 'react-bootstrap';
import './GameDetails.css';
import { motion } from 'framer-motion'




export function GameDetails() {
    const { gameId } = useParams();

    const [gameDetails, setGameDetails] = useState({});
    const [screenshots, setScreenshots] = useState([]);
    

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const gameDetailsResponse = await fetch(`https://api.rawg.io/api/games/${gameId}?key=0f12a281470b42668b45e0a6e06eafa1`);
                const gameDetailsData = await gameDetailsResponse.json();
                setGameDetails(gameDetailsData);

                const screenshotsResponse = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=0f12a281470b42668b45e0a6e06eafa1`);
                const screenshotsData = await screenshotsResponse.json();
                setScreenshots(screenshotsData.results);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGameData();
    }, [gameId]);

    const cardStyle = {
        initial: { rotate: 0, scale: 1 },
        animate: { rotate: 0, scale: 1 },
        whileHover: {
            rotate: 0,
            scale: 1.5,
            y: -20,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            transition: {duration: 0.2}
        },
		whileTap: { scale: 4, y:-200}
    };

    return (
        <Layout>
            <Container className='details-container'>
            {gameDetails.background_image && (
                <div className='details-title-card' style={{ marginBottom: '20px' }}>
                    <h1 className='details-title'>{gameDetails.name}</h1>
                    <img className='details-cover-image'
                        src={gameDetails.background_image}
                        alt={`${gameDetails.name} cover`}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />

                </div>
            )}
            <div>

            <p className='details-description'>{gameDetails.description_raw}</p>

            {gameDetails.metacritic && (
                <p className='details-metacritic'><strong>Metacritic Rating:</strong> {gameDetails.metacritic}</p>
            )}

            <p className='details-platform'><strong>Available on:</strong></p>
            <ul className='details-platform-list'>
                {gameDetails.platforms && gameDetails.platforms.map((platform, index) => (
                    <li key={index}>{platform.platform.name}</li>
                ))}
            </ul>

            <h2 className='details-subtitle'>Screenshots(click to enlarge):</h2>
            <div className='details-screenshots' style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {screenshots.map((screenshot, index) => (
                    <motion.div initial={cardStyle.initial}
                    animate={cardStyle.animate}
                    whileHover={cardStyle.whileHover}
                    whileTap={cardStyle.whileTap}>
                    <img className='details-img'
                        key={index}
                        src={screenshot.image}
                        alt={gameDetails.name}
                        style={{ width: '200px', height: 'auto' }}
                    />
                    </motion.div>
                ))}
            </div>
        </div>
        </Container>
        </Layout>
    );
}
