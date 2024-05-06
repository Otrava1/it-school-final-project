import React, { useState } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import GameCard from './GameCard';
import { AnimatePresence, motion } from 'framer-motion';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const API_KEY = '0f12a281470b42668b45e0a6e06eafa1';

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const searchGames = async () => {
        setIsSearching(true);

        if (query === '') {
            setResults([]);
            setIsSearching(false);
            return;
        }

        const url = `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data from RAWG API');
            }
            const data = await response.json();
            
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const resetSearch = () => {
        setQuery('');
        setResults([]);
        setIsSearching(false);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchGames();
        }
    };

    const itemAnimation = (index) => ({
        initial: { opacity: 0, y: -20, },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: {
            duration: 0.2,
            delay: index * 0.1,
        },
    });

    return (
        <div>
            <FormControl className='searchtextbox' size='lg'
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for games..."
                onKeyDown={handleKeyPress}
            />
            <Button variant="outline-light my-2 mx-1" onClick={searchGames}>Search</Button>
            <Button variant="outline-danger my-2 mx-1" onClick={resetSearch}>Reset Search</Button>

            {!isSearching && results.length === 0 && (
                <div></div>
            )}


            {isSearching || results.length > 0 ? (
                <Container className='gamegrid'>
                    <Row>
                    <AnimatePresence>
                {results.map((game, index) => {
                return (
                    <Col xs={12} md={6} lg={4} className="mb-4">
                        <motion.div key={game.id}
                            initial={itemAnimation(index).initial}
                            animate={itemAnimation(index).animate}
                            exit={itemAnimation(index).exit}
                            transition={itemAnimation(index).transition}>
                        <GameCard id={game.id} imgSrc={game.background_image} title={game.name} description={game.metacritic}/>
                        </motion.div>
                    </Col>
                )
            })}
            </AnimatePresence>
            </Row>
                </Container>
            ) : null}
        </div>
    );
};

export default SearchBar;
