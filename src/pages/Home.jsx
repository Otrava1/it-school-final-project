import React from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { motion } from 'framer-motion';

export function Home() {

	const cardStyle = {
        initial: { rotate: 0, scale: 0.95 },
        animate: { rotate: 7, scale: 0.95, y:-150 },
        whileHover: {
            rotate: 0,
            scale: 1.3,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
        },
		whileTap: { scale: 0.9 }
    };


	return (
		<>
			<Layout>
			<h3 className="home-title">Welcome to my game library!</h3>
				<Container className="home-container">
				<Link className='home-link' to='/library'>
				<motion.div className="home-cards left"
                initial={cardStyle.initial}
                animate={cardStyle.animate}
                whileHover={cardStyle.whileHover}
				whileTap={cardStyle.whileTap}>Library
				</motion.div>
				</Link>
				<Link className='home-link' to='/collection'>
				<motion.div className="home-cards right"                 
				initial={cardStyle.initial}
                animate={cardStyle.animate}
                whileHover={cardStyle.whileHover}
				whileTap={cardStyle.whileTap}>Collection</motion.div>
				</Link>
				</Container>
			</Layout>
		</>
	);
}
