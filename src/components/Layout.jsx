import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(props) {
	return (
		<div className="container">
			<Header />
			<main>{props.children}</main>
			<Footer />
		</div>
	);
}
