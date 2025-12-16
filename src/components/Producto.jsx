import React, { useContext } from 'react';


export default function Producto({ producto }) {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="producto-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>{producto.nombre}</h2>
      <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Idioma:</strong> {producto.idioma}</p>
      <p>{producto.descripcion}</p>
      
      <button
        onClick={() => agregarAlCarrito(producto)}
        disabled={!producto.disponible || producto.stock === 0}
      >
        {producto.disponible && producto.stock > 0 ? 'Agregar al carrito' : 'No disponible'}
      </button>
    </div>
  );
}
