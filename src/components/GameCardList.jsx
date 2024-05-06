import { Col, Container, Row } from "react-bootstrap";
import GameCard from "./GameCard";
import './GameCardList.css'
import { AnimatePresence, motion } from 'framer-motion';


export function GameCardList (props) {
    const { gameList } = props;

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
    <Container className="gamegrid">
        <Row>
        <AnimatePresence>
            {gameList.map((game, index) => {
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
    )
}