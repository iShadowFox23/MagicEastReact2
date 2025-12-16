import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './components/style.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import  CarritoProvider  from './components/FuncionesCarrito.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>
);
