import { useState, useEffect } from "react";

export function useFetch(url, doFetch) {
	const [dataGames, setDataGames] = useState(null);
	const [errorState, setErrorState] = useState(null);
	const [loadingState, setLoadingState] = useState(true);

	useEffect(() => {
		if (doFetch) {
			fetch(url)
				.then((response) => response.json())
				.then((json) => {
					setDataGames(json);
				})
				.catch((error) => {
					setLoadingState(false);
					setErrorState(error);
				})
				.finally(() => {
					setLoadingState(false);
				});
		}
	}, [url, doFetch]);

	return { dataGames, loadingState, errorState };
}
