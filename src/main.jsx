import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './index.jsx'; // Importing the default exported component
import './index.css';            // Correct CSS import (not .jsx!)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
