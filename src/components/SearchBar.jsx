import React, { useState } from "react";
import { Button, Col, Container, FormControl, Row } from "react-bootstrap";
import GameCard from "./GameCard";
import { AnimatePresence, color, motion } from "framer-motion";
import { useFetch } from "../utils/hooks/useFetch";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const API_KEY = "0f12a281470b42668b45e0a6e06eafa1";

	const url = `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}&page_size=5`;
	const { dataGames } = useFetch(url, isSearching);

	const handleInputChange = (event) => {
		setQuery(event.target.value);
	};

	const searchGames = () => {
		setIsSearching(true);
	};

	const resetSearch = () => {
		setQuery("");
		setIsSearching(false);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			searchGames();
		}
	};

	const itemAnimation = (index) => ({
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
		transition: {
			duration: 0.2,
			delay: index * 0.1,
		},
	});

	const getSearchResults = () => {
		if (!isSearching || !dataGames) {
			return <></>;
		}
		if (isSearching && dataGames?.results.length > 0) {
			return (
				<Container className="gamegrid">
					<Row>
						<AnimatePresence>
                            <h2 style={{color:'white'}}>Search Results:</h2>
							{dataGames.results.map((game, index) => {
								return (
									<Col xs={12} md={6} lg={4} className="mb-4">
										<motion.div
											key={game.id}
											initial={itemAnimation(index).initial}
											animate={itemAnimation(index).animate}
											exit={itemAnimation(index).exit}
											transition={itemAnimation(index).transition}
										>
											<GameCard
												id={game.id}
												imgSrc={game.background_image}
												title={game.name}
												description={game.metacritic}
											/>
										</motion.div>
									</Col>
								);
							})}
						</AnimatePresence>
					</Row>
				</Container>
			);
		}
	};

	return (
		<div>
			<FormControl
				className="searchtextbox"
				size="lg"
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder="Search for games..."
				onKeyDown={handleKeyPress}
			/>
			<Button variant="outline-light my-2 mx-1" onClick={searchGames}>
				Search
			</Button>
			<Button variant="outline-danger my-2 mx-1" onClick={resetSearch}>
				Reset Search
			</Button>
			{getSearchResults()}
		</div>
	);
};

export default SearchBar;
