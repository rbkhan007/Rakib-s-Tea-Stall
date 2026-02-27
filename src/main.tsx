/**
 * Rakib's Tea Stall - Modern Luxury Tea Experience
 * Entry point for the React application
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render app with StrictMode for development checks
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
