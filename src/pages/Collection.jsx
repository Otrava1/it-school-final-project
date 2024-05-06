import React from 'react';
import { useCollection } from '../collection/context';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import CollectionGameCard from '../components/CollectionCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

export function Collection() {
    const { collection, removeItemFromCollection } = useCollection();

    const itemAnimation = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20, },
        transition: { duration: 0.7 },
    };

    return (
        <Layout>
            <AnimatePresence>
        <motion.div  {...itemAnimation}>
            {collection.length === 0 ? (
                <p className='collection-empty'>Your collection is empty</p>
            ) : (
                <Container className="gamegrid">
                <Row>
                    {collection.map((item) => (
                        <Col xs={12} md={6} lg={4} className="mb-4" key={item.id} >
                            <CollectionGameCard id={item.id} imgSrc={item.imgSrc} title={item.title} description={item.description}/>
                            <Button variant='outline-danger my-2'onClick={() => removeItemFromCollection(item)}>Remove</Button>
                        </Col>
                    ))}
</Row>
</Container>
            )}
        </motion.div>
        </AnimatePresence>
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
}
