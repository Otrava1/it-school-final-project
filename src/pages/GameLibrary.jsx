import React from "react";
import { useFetch } from "../utils/hooks/useFetch";
import { Layout } from "../components/Layout";
import { GameCardList } from "../components/GameCardList";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { ToastContainer } from "react-toastify";

export const GameLibrary = () => {
	const apiKey = "0f12a281470b42668b45e0a6e06eafa1";
	const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`;
	const { dataGames, loadingState, errorState } = useFetch(url, true);

	if (loadingState) {
		return (
			<div className="loader">
				<div className="animated-loader"></div>
			</div>
		);
	}

	if (errorState) {
		return <div className="error-message">Error in communicating with API</div>;
	}

	return (
		<Layout>
			<Container className="gamegrid">
				<SearchBar className="searchbar" />
				<GameCardList gameList={dataGames.results} />
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
