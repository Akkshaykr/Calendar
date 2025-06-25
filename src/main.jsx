import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Index.jsx'; // or './App.jsx' if renamed
import './Index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
