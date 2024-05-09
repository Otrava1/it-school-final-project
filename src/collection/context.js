import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const CollectionContext = createContext();

export function useCollection() {
    return useContext(CollectionContext);
}

export function CollectionProvider({ children }) {
    const [collection, setCollection] = useState(() => {
        const savedCollection = localStorage.getItem('collection');
        return savedCollection ? JSON.parse(savedCollection) : [];
    });


    useEffect(() => {
        localStorage.setItem('collection', JSON.stringify(collection));
    }, [collection]);

    const addItemToCollection = (item) => {
        const itemExists = collection.some((collectionElem) => collectionElem.id === item.id);
        if (!itemExists) {
            setCollection((prevCollection) => [...prevCollection, item]);
            toast.success(`"${item.title}" has been added to your collection.`);
        } else {
            toast.error(`"${item.title}" is already in your collection.`);
        }
    };

    const removeItemFromCollection = (item) => {
        setCollection((prevCollection) => prevCollection.filter((i) => collectionElem.id !== item.id));
        toast.warning(`"${item.title}" has been removed from your collection.`);
    };

    return (
        <CollectionContext.Provider value={{ collection, addItemToCollection, removeItemFromCollection }}>
            {children}
        </CollectionContext.Provider>
    );
}