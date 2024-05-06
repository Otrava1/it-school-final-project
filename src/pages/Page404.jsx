import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export function Page404() {
	return (
		<>
			<Layout>
				<h1>Page404</h1>
				<Link to="/">Home</Link>
			</Layout>
		</>
	);
}
