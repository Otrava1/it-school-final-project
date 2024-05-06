import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'

const root = createRoot(document.getElementById('app'));

root.render(
    <StrictMode>
    <App />
    </StrictMode>
);
