import React from 'react';
import Login from "../components/Producto.jsx";
import "../components/style.css"

const productos = [
];

export default function ProductoPag() {
  return (
    <div>
      <h1>Catalogo de Productos</h1>
      {productos.map(prod => (
        <Producto key={prod.id} producto={prod} />
      ))}
    </div>
  );
}

